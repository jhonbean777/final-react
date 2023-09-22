import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define the EmpListing Component
const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  }

  //  Function to navigate to the employee detail page
  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  }

  //  Function to remove an employee
  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {

      // Send a DELETE request to the API to remove the employee
      fetch("http://localhost:7000/employee/" + id, {
        method: "DELETE"
      }).then((res) => {
        alert('Removed successfully.')
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  useEffect(() => {
    fetch("http://localhost:7000/employee").then((res) => {
      return res.json();
    }).then((resp) => {
      empdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])


  // Render the EmpListing component
  return (
    <div className="container outer">
      <div className="card card1">
        <div className="card-title">
          <br></br><br></br>
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="divbtn">
              <Link to="employee/create" className="btn btn-success c1">Add New(+)</Link>
            </div>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                </tr>
              </thead>
              <tbody>
                {empdata &&
                  empdata.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                        <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                        <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpListing;