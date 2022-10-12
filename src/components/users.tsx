import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ReactPaginate from "react-paginate";

const Users = () => {   
  const [userList, setUserList] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 7;

  useEffect(() => {
    getUserWithFetch();
  }, []);

  useEffect(() => {
    const getUsersPage = async () => {
      const response = await fetch( `http://localhost:8082/users?page=0&limit=${limit}`);
      const data = await response.json();
      var result: any = [];

      for(var i in data.items) {
        result.push(data.items[i]);
      }
      const total = data.total;
      setpageCount(Math.ceil(total / limit));
      setUserList(result);
    };

    getUsersPage();
  }, [limit]);

  const getUserWithFetch = async () => {
    const response = await fetch("http://localhost:8082/users");
    const jsonData = await response.json();
    var result: any = [];

    for(var i in jsonData.items) {
      result.push(jsonData.items[i]);
    }
    setUserList(result);
  };

  const paginatedUsers = async (currentPage: any) => {
    const response = await fetch(`http://localhost:8082/users?page=${currentPage}&limit=${limit}`);
    const data = await response.json();
    var result = [];

    for(var i in data.items) {
      result.push(data.items[i]);
    }
    return result;
  };

  const handlePageClick = async (data: any) => {
    let currentPage = data.selected;

    const commentsFormServer: any = await paginatedUsers(currentPage);

    setUserList(commentsFormServer);
  };

  const UpdateUser = (id: any) => {
    window.location.href = '/update/'+id
  }

  const DeleteUser = (id: any) => {
    fetch('http://localhost:8082/users/user?id='+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result) {
          getUserWithFetch();
          window.location.href = '/';
        }
      }
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Get Users</h2>
      </header>
      <div className="button-container">
        <Link to="/create">
          <Button className="create" variant="contained" color="primary">
            CREATE
          </Button>
        </Link>
      </div>
      <Container className="container">
        <Table className="table table-striped table-bordered">
            <TableHead className="row-header">
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Surname</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user: any) => (
                <>
                  <TableRow key={user.id} className="row-data">
                    <TableCell align="left" className="row-item">{user.name}</TableCell>
                    <TableCell align="left" className="row-item">{user.surname}</TableCell>
                    <TableCell align="left" className="row-item">{user.username}</TableCell>
                    <TableCell align="left" className="row-item">{user.email}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar src={user.avatar} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button className="btn-update" onClick={() => UpdateUser(user.id)}>Update</Button>
                        <Button className="btn-delete" onClick={() => DeleteUser(user.id)}>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
        </Table>
      </Container>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );

};
export default Users;