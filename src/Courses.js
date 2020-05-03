import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  coursesTable: {
    width: "80%",
    margin: "auto",
    marginTop: 15,
  },
  addButton: {
    float: "right",
    marginBottom: 10,
  },
  addDialog: {
    width: 500,
    maxHeight: 800,
  },
  addFields: {
    marginTop: 25,
  }
});

const Courses = props => {
    const [open, setOpen] = React.useState(false);
    const [actionType, setActionType] = React.useState(0);
    const [newCourse, setNewCourse] = React.useState({name: '', totalHours: 0, description: ''});
    const [editId, setEditId] = React.useState(0);
    const handleClickOpen = () => {
        setOpen(true);
        setActionType(0);
    };
    const handleClickEdit = (row) => {
        setOpen(true);
        setActionType(1);
        setNewCourse({name: row.name, description: row.description, totalHours: row.hoursTotal});
        setEditId(row.id);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleSubmit = () => {
        if (actionType === 0) {
            if (newCourse.name === '') {
                alert("Please input course name");
                return
            }
            props.addCourse(newCourse);
        } else {
            if (newCourse.name === "") {
                alert("Please input course name");
                return;
            }
            props.updateCourse(newCourse, editId);
            setEditId(0);
        }
        setNewCourse({ name: "", totalHours: 0, description: "" });
        setOpen(false);
    }

    const classes = useStyles();
    if (props.courses.length === 0) {
        return <p>Loading...</p>
    }
    return (
      <div className={classes.coursesTable}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.addButton}
              onClick={handleClickOpen}
            >
              Add Course
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Total Hours</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.courses.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.hoursTotal}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleClickEdit(row)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Course Information</DialogTitle>
          <DialogContent className={classes.addDialog}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              type="text"
              fullWidth
              onChange={handleInputChange}
              value={newCourse.name}
            />
            <TextField
              autoFocus
              margin="dense"
              id="totalHours"
              name="totalHours"
              label="Total Hours"
              type="number"
              fullWidth
              className={classes.addFields}
              onChange={handleInputChange}
              value={newCourse.totalHours}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              multiline
              fullWidth
              rows={4}
              className={classes.addFields}
              onChange={handleInputChange}
              value={newCourse.description}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              onClick={handleSubmit}
            >
              {actionType === 0 ? 'Add' : 'Update' }
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default Courses;
