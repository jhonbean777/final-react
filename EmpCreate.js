import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const EmpCreate = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };


  const [existingEmails, setExistingEmails] = useState([]); // Store existing emails
  useEffect(() => {
    // Fetch existing emails from the server when the component mounts
    axios.get("http://localhost:7000/employee")
      .then((response) => {
        const emails = response.data.map((item) => item.email);
        setExistingEmails(emails);
      })
      .catch((error) => {
        console.error("Error loading existing emails:", error);
      });
  }, []);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/(?=.*[',A-Z,a-z])/, "Name must contain a letter.")
      .min(2, "Too Short!")
      .max(25, "Too Long!"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test("unique-email", "Email is already in use", function (value) { 
        return !existingEmails.includes(value);
      }),
    phone: Yup.string()
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Please enter a valid phone number (e.g., +1234567890)')
      .required("Phone number is required"),
  });

  const handleSubmit = (values) => {
    fetch("http://localhost:7000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        alert("Saved Data Successfully..");
        navigate("/"); // Navigate to the homepage after successful submission
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Render the EmpCreate component
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mb-2">
          <section className="vh-100 form-section">
            <div className="container py-5 h-90">
              <div className="row d-flex justify-content-center align-items-center h-80">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong create-section">
                    <div className="card-body p-5 text-center">
                      <div className="table-responsive">
                        <h2 className="my-4 font-weight-bold display-4">Add new user</h2>
                        <div className="my-5">
                          <Field
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Name'
                          />
                          <ErrorMessage
                            className="error"
                            name="name"
                            component="div"
                          />
                        </div>

                        <div className="my-5">
                          <Field
                            className="form-control "
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'
                           
                          
                          />
                          <ErrorMessage
                            className="error"
                            name="email"
                            component="div"
                          />
                        </div>

                        <div className="my-5">
                          <Field
                            className="form-control"
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder='Phone No.'
                          />
                          <ErrorMessage
                            className="error"
                            name="phone"
                            component="div"
                          />
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <button className="btn btn-success" type="submit">Save</button>
                            <Link to="/" className="btn btn-danger">Back</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Form>
      </Formik>
    </div>
  );
};

// Export the EmpCreate component
export default EmpCreate;
