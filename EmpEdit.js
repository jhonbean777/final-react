import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useParams, useNavigate } from "react-router-dom";


const EmpEdit = () => {
  const { empid } = useParams();
  const navigate = useNavigate();

  // Define the initial form values
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    id: ""
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/(?=.*[a-zA-Z])/, "Name must contain letters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (values) => {
    fetch("http://localhost:7000/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    }).then((res) => {
      alert('Saved successfully.')
      navigate('/');
    }).catch((err) => {
      console.log(err.message)
    })
  }

  useEffect(() => {
    // Fetch and populate the form data based on empid
    fetch("http://localhost:7000/employee/" + empid)
      .then((res) => res.json())
      .then((resp) => {
        initialValues.id = resp.id;
        initialValues.name = resp.name;
        initialValues.email = resp.email;
        initialValues.phone = resp.phone;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);


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
                  <div className="card shadow-2-strong  edit-section">
                    <div className="card-body p-5 text-center">
                      <h2 className="my-4 font-weight-bold .display-4">Edit user</h2>
                      <div className="my-5">
                        <Field
                          className="form-control"
                          type="text"
                          id="id"
                          name="id"
                          placeholder='Id'
                          disabled="disabled"
                        />
                      </div>
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
                          disabled="disabled"
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
          </section>
        </Form>
      </Formik>
    </div>
  );
};

export default EmpEdit;




