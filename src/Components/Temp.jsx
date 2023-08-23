import React, { useState } from 'react';
import { useFetchBug } from './useFetchBug';
import {
  Button,
  TextField,
} from '@mui/material';
 // import BugReportIcon from '@mui/icons-material/BugReport';
import { gql, useMutation } from '@apollo/client';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import SelectComp from './SelectComp';
import { projectItems, statusItems, teamItems, devItems, uiuxItems, testingItems } from './MenuItemsComp';

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

// const projectItems = ["P1", "P2", "P3"];
const label ="project"
console.log(projectItems)


export const Temp = () => {
  const { data, loading, refetch, error } = useFetchBug();

  const [bugName, setBugName] = useState('');
  const [bugStatus, setBugStatus] = useState('');

  const [project, setProject] = useState('');

  const [addBug] = useMutation(ADD_BUG);
  const [updateBug] = useMutation(UPDATE_BUG);
  const [deleteBug] = useMutation(DELETE_BUG);

  const [openMode, setOpenMode] = useState(false)

  const handleAddModal = () => {
    setOpenMode(true)
  }
  
  const handleCloseModal = () => {
    setOpenMode(false)
  }

//   console.log(projectItems)


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
      
       <Button onClick={handleAddModal}>Add Bug</Button>
      {/* For adding a new bug */}
      <Modal open={openMode} onClose={handleCloseModal}>
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
            
            <SelectComp menu={projectItems} label={label} status={project} setStatus={setProject}/>
            <SelectComp/>  {/*  // Team */}
            <TextField/>   {/* summary */}
            <TextField/>    {/* desc*/}
            <SelectComp/>   {/*  // Assignee */}
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </Modal>

    </div>
  );
};
