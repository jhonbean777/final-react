import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//EmpDetail Component
const EmpDetail = () => {

  // Get the employee ID from the route parameters
  const { empid } = useParams();

  const [empdata, empdatachange] = useState({});

  useEffect(() => {

    // Fetch employee data from the API using the employee ID
    fetch("http://localhost:7000/employee/" + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      empdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  return (
    <div>
      <div className="container">
        <div className="card card1" style={{ "textAlign": "left" }}>
          <div className="col-lg-12 text-center">
            <br></br><br></br>
            <h2>Employee Details</h2>
          </div>
          <div className="card-body"></div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>id</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
              </tr>
            </thead>
            {empdata &&
              <tbody>
                <tr>
                  <td>{empdata.id}</td>
                  <td>{empdata.name}</td>
                  <td>{empdata.email}</td>
                  <td>{empdata.phone}</td>
                </tr>
              </tbody>
            }
          </table>
        </div>
      </div>
    </div >
  );
}

export default EmpDetail;