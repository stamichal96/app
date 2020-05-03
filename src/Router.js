import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

import { Header } from "./Layout/Layout";
import Courses from "./Courses";
import Login from './Login';

function Router(props) {
    const [courses, setCourses] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        async function getCourses(){
        axios.defaults.withCredentials = true;
        const headers = {
            "Content-Type": "application/json;charset=UTF-8", //If your header name has spaces or any other char not
            Accept: "application/json, text/plain, */*",
            tenant: "uitest",
            withCredentials: true,
        };
        try{
       let response = await axios.get(`https://api.esch.pl/api/courses?deleted=false`, { headers: headers, });
        setCourses(response.data.payload);
        }catch(error){
            Swal.fire({
                icon: 'error',
                text: 'sorry we are not able to connect to the server,logout and try again',
                title: 'Opps',
              })
        }
    }
    getCourses();

    },[])


    const authorize=(data)=>{
      console.log('data',data);
      setLoggedIn(data);
    }


    const updateCourse = (course, id) => {
        const headers = {
            "Content-Type": "application/json;charset=UTF-8", //If your header name has spaces or any other char not
            Accept: "application/json, text/plain, */*",
            tenant: "uitest",
            withCredentials: true,
        };
        const data = {
            active: true,
            description: course.description,
            hoursTotal: course.totalHours,
            name: course.name,
            id: id
        };
        axios.put(`https://api.esch.pl/api/courses`, data, {headers: headers}).then((res) => {
            console.log("editted by api...", res);
            if (res.status === 200) {
                Swal.fire(
                    "Course Updated",
                    "The changes were saved correctly.",
                    "success"
                );
            } else {
                Swal.fire(
                  "Course Update Failed",
                  "The changes not saved correctly.",
                  "error"
                );
            }
        });
    }



    const addCourse = course => {
        const headers = {
            "Content-Type": "application/json;charset=UTF-8", //If your header name has spaces or any other char not
            Accept: "application/json, text/plain, */*",
            tenant: "uitest",
            withCredentials: true,
        };
        const data = {
            active: true,
            description: course.description,
            hoursTotal: course.totalHours,
            name: course.name
        }
        axios.post(`https://api.esch.pl/api/courses`, data, {headers: headers}).then((res) => {
            if (res.status === 201) {
                Swal.fire(
                    "Course Added",
                    "The course added correctly.",
                    "success"
                );
            } else {
                Swal.fire(
                    "Course Add Failed",
                    "The course not added correctly.",
                    "error"
                );
            }
        });
    }

    return (
        <BrowserRouter>
            <div className="container">
            <Header loggedIn={loggedIn} />
            <div className="row justify-content-center">
                <Switch>
                <Route exact  path="/">
                <Login onAuthorized={authorize} />
               </Route>


                 <Route  exact path="/course">
            <Courses courses={courses}
                        addCourse={addCourse}
                        updateCourse={updateCourse}/>
           </Route>
                </Switch>
            </div>
            </div>
        </BrowserRouter>
    );
}
export default Router;
