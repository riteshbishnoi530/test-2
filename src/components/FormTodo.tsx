"use client";
import React, { useState } from "react";

interface FormValues {
  firstName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Todo: any = () => {
  const form: FormValues = {
    firstName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<FormValues[]>([]);
  const [formValues, setFormValues] = useState<FormValues>(form);
  const [error, setError] = useState(false);

  const EmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handlerSubmit = (e: any) => {
    e.preventDefault();
    if (
      formValues.firstName.length > 0 &&
      EmailRegex.test(formValues.email) &&
      formValues.email.length > 0 &&
      !formData.some((item: FormValues) => item.phone === formValues.phone) &&
      formValues.phone.length >= 10 &&
      formValues.password.length >= 6 &&
      formValues.confirmPassword === formValues.password
    ) {
      setFormValues(form);
      setError(false);
      setFormData([...formData, formValues]);
    } else {
      setError(true);
    }
  };

  const handleDelete = (index: number) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  return (
    <div className="m-8 font-sans">
      <h2 className="text-2xl mb-6 text-center">Form</h2>
      <form
        className="max-w-md mx-auto flex justify-center items-center flex-col w-full"
        id="form"
        onSubmit={handlerSubmit}
      >
        <div className="mb-4 w-full">
          <label htmlFor="first-name" className="block mb-2">
            {error && formValues.firstName.length === 0 ? (
              <p className="text-red-900 leading-[30px]">
                First name is required
              </p>
            ) : (
              <p className="text-black-light leading-[30px]">First name</p>
            )}
          </label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            value={formValues.firstName}
            onChange={(e) =>
              setFormValues({ ...formValues, firstName: e.target.value })
            }
            className="w-full px-3 py-2 border !text-black border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block  mb-2">
            {error && formValues.email.length === 0 ? (
              <p className="text-red-900 leading-[30px]">Email is required</p>
            ) : !EmailRegex.test(formValues.email) &&
              formValues.email.length > 0 ? (
              <p className="text-red-900 leading-[30px]">Email is not valid</p>
            ) : formData.some((item: FormValues) => item.email === formValues.email) ? (
              <p className="text-red-900 leading-[30px]">
                Email already exists
              </p>
            ) : (
              <p className="text-black-light leading-[30px]">Email</p>
            )}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            className="w-full px-3 py-2 border !text-black border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="phone" className="block mb-2">
            {error && formValues.phone.length === 0 ? (
              <p className="text-red-900 leading-[30px]">
                Phone number is required
              </p>
            ) : formValues.phone.length < 10 && formValues.phone.length > 0 ? (
              <p className="text-red-900 leading-[30px]">
                Phone number is not valid
              </p>
            ) : (
              <p className="text-black-light leading-[30px]">Phone</p>
            )}
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formValues.phone}
            onChange={(e) =>
                  setFormValues({ ...formValues, phone: e.target.value })
                }
                className="w-full px-3 py-2 border !text-black border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="password" className="block mb-2">
                {error && formValues.password.length === 0 ? (
                  <p className="text-red-900 leading-[30px]">
                    Password is required
                  </p>
                ) : formValues.password.length < 6 && formValues.password.length > 0 ? (
                  <p className="text-red-900 leading-[30px]">
                    Password must be at least 6 characters
                  </p>
                ) : (
                  <p className="text-black-light leading-[30px]">Password</p>
                )}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
                className="w-full px-3 py-2 border !text-black border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="confirm-password" className="block mb-2">
                {error && formValues.confirmPassword.length === 0 ? (
                  <p className="text-red-900 leading-[30px]">
                    Confirm password is required
                  </p>
                ) : formValues.confirmPassword !== formValues.password ? (
                  <p className="text-red-900 leading-[30px]">
                    Confirm password does not match
                  </p>
                ) : (
                  <p className="text-black-light leading-[30px]">
                    Confirm password
                  </p>
                )}
              </label>
              <input
                value={formValues.confirmPassword}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    confirmPassword: e.target.value,
                  })
                }
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full px-3 py-2 border !text-black border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 mx-auto text-white rounded"
            >
              Submit
            </button>
          </form>
    
          <div className="mt-8">
            <h3 className="text-xl mb-4 w-full">Submitted Data</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    First Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Phone
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Password
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {data.firstName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data.password}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
    
    export default Todo;