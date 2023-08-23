import React, { useState } from 'react';
import { useFetchBug } from './useFetchBug';
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import { gql, useMutation } from '@apollo/client';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const ADD_BUG = gql`
  mutation AddBug($bug_name: String!, $bug_status: String!) {
    addBug(bug_name: $bug_name, bug_status: $bug_status) {
      id
      bug_name
      bug_status
    }
  }
`;

const UPDATE_BUG = gql`
  mutation UpdateBug($id: ID!, $bug_name: String!, $bug_status: String!) {
    updateBug(id: $id, bug_name: $bug_name, bug_status: $bug_status) {
      id
      bug_name
      bug_status
    }
  }
`;


const DELETE_BUG = gql`
  mutation DeleteBug($id: ID!) {
  deleteBug(id: $id)
}
`;

export const GetBug = () => {
  const { data, loading, refetch, error } = useFetchBug();

  const [bugName, setBugName] = useState('');
  const [bugStatus, setBugStatus] = useState('');

  const [addBug] = useMutation(ADD_BUG);
  const [updateBug] = useMutation(UPDATE_BUG);
  const [deleteBug] = useMutation(DELETE_BUG);

  const [editMode, setEditMode] = useState(false);
  const [editableBugName, setEditableBugName] = useState('');
  const [editableBugStatus, setEditableBugStatus] = useState('');
  const [selectedBugId, setSelectedBugId] = useState(null);

  const handleEditClick = (bug) => {
    setEditableBugName(bug.bug_name);
    setEditableBugStatus(bug.bug_status);
    setSelectedBugId(bug.id);
    setEditMode(true);
  };

  const handleSaveClick = () => {
    updateBug({
      variables: {
        id: selectedBugId,
        bug_name: editableBugName,
        bug_status: editableBugStatus,
      },
    });
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleDeleteClick = (bugId) => {
    deleteBug({
      variables: {
        id: bugId,
      },
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', 
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error){
    return(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <h1>oops... something went wrong..!!</h1>
      </div>
    )
  }

  return (
    <div>
      

      {/* For adding a new bug */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          marginLeft: '500px',
          marginTop: '100px',
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Add a New Bug:</div>
        <TextField
          label="Bug Name"
          onChange={(e) => setBugName(e.target.value)}
          variant="outlined"
        />
        <Select
          label="Status"
          onChange={(e) => setBugStatus(e.target.value)}
          variant="outlined"
          style={{ width: '200px' }} // Adjust the width as needed
        >
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Todo">To Do</MenuItem>
        </Select>
        <Button
          onClick={() => {
            addBug({variables: { bug_name: bugName, bug_status: bugStatus },});
            refetch();
          }}
          variant="contained"
          color="primary"
          size="small"
          style={{ display: 'flex', justifyContent:'center', alignItems: 'center', gap: '5px' }}
        >
          Add Bug
          <BugReportIcon />
        </Button>
      </div>


      {/* For displaying the bugs */}
      <div
        style={{
          marginBottom: '20px',
          marginTop: '40px',
          background: '#909090', 
          padding: '10px 0', 
          borderRadius: '5px',
          textAlign: 'center', 
          width: '20%', 
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#fff' }}>Current Issues:</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {data.getBugs.map(bug => (
          <Card key={bug.id} style={{ maxWidth: 400 }}>
            <CardContent>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{bug.bug_name}</h1>
              <p style={{ fontSize: '1.1rem', color: '#777', backgroundColor: '#f0f0f0', padding: '5px 10px', borderRadius: '5px', display: 'inline-block',}}>{bug.bug_status}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(bug)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ backgroundColor: '#d32f2f' }}
                  onClick={() => {
                    handleDeleteClick(bug.id);
                    refetch();
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for editing */}
      <Modal open={editMode} onClose={handleCancelClick}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            maxWidth: '400px',
          }}
        >
          <TextField
            label="Bug Name"
            value={editableBugName}
            onChange={(e) => setEditableBugName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Select
            label="Status"
            value={editableBugStatus}
            onChange={(e) => setEditableBugStatus(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Todo">To Do</MenuItem>
          </Select>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>


    </div>
  );
};
