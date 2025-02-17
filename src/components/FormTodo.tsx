"use client";
import React, { useEffect, useState } from "react";

interface FormValues {
  firstName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const FormTodo: any = () => {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);
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
          <input
            placeholder="Name"
            type="text"
            value={formValues.firstName}
            onChange={(e) =>
              setFormValues({ ...formValues, firstName: e.target.value })
            }
            className="outline-none w-full px-3 py-2 border !text-black border-gray-300 rounded"
          />
          {error && !formValues.firstName ? (
            <p className="text-red-500 text-base font-normal">
              Name is required
            </p>
          ) : ""}

        </div>
        <div className="mb-4 w-full">
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            className="outline-none w-full px-3 py-2 border !text-black border-gray-300 rounded"
          />
          {error && !formValues.email ? (
            <p className="text-red-500 text-base font-normal">
              Email is required
            </p>
          ) : !EmailRegex.test(formValues.email) && formValues.email.length > 0 ? <p className="text-red-500 text-base font-normal">
            Email is not valid
          </p> : ""}

        </div>
        <div className="mb-4 w-full">
          <input
            placeholder="Phone"
            type="number"
            id="phone"
            name="phone"
            value={formValues.phone}
            onChange={(e) =>
              setFormValues({ ...formValues, phone: e.target.value })
            }
            className="outline-none w-full px-3 py-2 border !text-black border-gray-300 rounded"
          />
          {error && !formValues.phone ? (
            <p className="text-red-500 text-base font-normal">
              Phone is required
            </p>
          ) : formValues.phone.length < 10 && formValues.phone.length > 0 ?
            <p className="text-red-500 text-base font-normal">
              max 10 digit
            </p> : ""
          }

        </div>
        <div className="mb-4 w-full">
          <div className="flex bg-white px-3 py-2 border  border-gray-300 rounded">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              className="outline-none w-full !text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && !formValues.password ? (
            <p className="text-red-500 text-base font-normal">
              Password is required
            </p>
          ) : formValues.password.length < 6 && formValues.password.length > 0 ?
            <p className="text-red-500 text-base font-normal">
              Password must be at least 6 characters long.
            </p> : ""
          }
        </div>
        <div className="mb-4 w-full">
          <div className="flex px-3 py-2 border border-gray-300 rounded bg-white">
            <input
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  confirmPassword: e.target.value,
                })
              }
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              className="outline-none w-full !text-black"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-black"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && !formValues.confirmPassword ? (
            <p className="text-red-500 text-base font-normal">
              confirm Password is required
            </p>
          ) : formValues.confirmPassword !== formValues.password && formValues.confirmPassword.length > 0 ?
            <p className="text-red-500 text-base font-normal">
              password not match
            </p> : ""
          }
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
        <table className="w-full border-collapse overflow-x-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
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
                Delete
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

export default FormTodo;