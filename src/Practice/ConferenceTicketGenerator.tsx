import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
  name: string;
  email: string;
  username: string;
  avatar: File | null;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string().required("username is required"),
  avatar: Yup.mixed()
    .nullable()
    .required("Avatar is required")
    .test("fileFormat", "Only PNG, JPG, and JPEG are allowed", (value) => {
      if (value && value instanceof File) {
        const formats = ["image/png", "image/jpeg", "image/jpg"];
        return formats.includes(value.type);
      }
      return false;
    })
    .test("fileSize", "File is too large. Max size is 200KB", (value) => {
      if (value && value instanceof File) {
        return value.size <= 200 * 1024; // 200KB
      }
      return false;
    }),
});

export const ConferenceTicketGenerator = () => {
  const [ticket, setTicket] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      avatar: null as File | null, // 明确类型
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      // Generate ticket after form submission (for demo purposes)
      setTicket(
        `Ticket for ${values.name}, Email: ${values.email} Username: ${values.username}`
      );
    },
  });

  return (
    <div className="h-full w-full">
      <div className="font-bold text-3xl mb-2">
        Practice 06: Conference ticket generator
      </div>
      <div className="w-full h-full relative ">
        <img
          className="absolute w-2/4 h-4/4 bottom-0 z-[-1]"
          src="Images/CTicketGenerator/pattern-squiggly-line-bottom-desktop.svg"
          alt="bg-pattern-squiggly-line-bottom"
        />
        <img
          className="absolute w-2/4 h-4/4 z-[-1] top-20 right-0"
          src="/Images/CTicketGenerator/pattern-squiggly-line-top.svg"
          alt="bg-pattern-squiggly-line-top"
        />
        <img
          className="absolute w-full h-full z-[-2]"
          src="Images/CTicketGenerator/background-desktop.png"
          alt="bg-background-desktop"
        />

        <div className="flex justify-center h-[800px] pt-10">
          <form
            onSubmit={formik.handleSubmit}
            className="text-white w-[450px] "
          >
            {/* Name Field */}
            <div className="flex items-center gap-2 justify-center font-bold ">
              <img
                src="Images/CTicketGenerator/logo-mark.svg"
                className="w-5 h-5"
                alt="logo-mark"
              />
              <p>Coding Conf</p>
            </div>
            <p className="font-bold text-3xl text-center mt-8">
              Your Journey to Coding Conf 2025 Starts Here!
            </p>
            <p className="font-semibold text-gray-300 text-sm text-center mt-4">
              Secure your spot at next year's biggest coding conference.
            </p>

            <div className="pt-8 flex flex-col gap-4">
              {/* Avatar Upload Field */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium mb-1"
                >
                  Upload Avatar
                </label>
                {/* Hidden input */}
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    formik.setFieldValue("avatar", file || null);
                  }}
                  onBlur={formik.handleBlur}
                  className="hidden"
                  aria-required="true"
                  aria-describedby="avatarError"
                />
                {/* Custom upload button */}
                <label
                  htmlFor="avatar"
                  className="flex h-32 w-full border border-gray-300 rounded-md cursor-pointer items-center justify-center bg-[#1c163c] hover:bg-[#312361] flex-col"
                >
                  {formik.values.avatar ? (
                    // If file is selected, show image preview and file info
                    <div className="text-center p-2 w-full h-full flex flex-col items-center">
                      {/* Image preview */}
                      <div className="h-20 w-full flex mb-1">
                        <img
                          src={URL.createObjectURL(formik.values.avatar)}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-white font-medium truncate max-w-full">
                        {formik.values.avatar.name}
                      </p>
                      {/* <p className="text-gray-400 text-sm">
                      {(formik.values.avatar.size / 1024).toFixed(2)} KB
                    </p> */}
                    </div>
                  ) : (
                    // If no file selected, show upload prompt
                    <>
                      <div className="bg-[#322e51] size-10 p-2 rounded-lg">
                        <img
                          src="Images/CTicketGenerator/icon-upload.svg"
                          alt="icon-upload"
                        />
                      </div>
                      <p className="text-gray-400 mt-3">
                        Drag and drop or click to upload
                      </p>
                    </>
                  )}
                </label>

                {formik.touched.avatar && formik.errors.avatar ? (
                  <div className="text-red-500 text-sm mt-1" id="avatarError">
                    {formik.errors.avatar}
                  </div>
                ) : (
                  <div className="flex w-full gap-1">
                    <img
                      src="Images/CTicketGenerator/icon-info.svg"
                      alt="icon-info"
                    />
                    <p className="text-gray-400">
                      Upload your photo (JPG or PNG, max size : 500KB)
                    </p>
                  </div>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-500/20 mt-1 block w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white"
                  aria-required="true"
                  aria-describedby="nameError"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm mt-1" id="nameError">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-500/20 mt-1 block w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white"
                  aria-required="true"
                  aria-describedby="emailError"
                  placeholder="example@email.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1" id="emailError">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              {/* userName Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Github Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="@yourusername"
                  className="bg-gray-500/20 mt-1 block w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white"
                  aria-required="true"
                  aria-describedby="nameError"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm mt-1" id="nameError">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#f67464] text-[#53283a] font-black rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-2"
              >
                Generate My Ticket
              </button>
            </div>
          </form>

          {/* Ticket Display */}
          {ticket && (
            <div className="mt-6 p-4 border border-green-500 bg-green-50 text-green-700 rounded-md">
              <h3 className="font-semibold">Conference Ticket</h3>
              <p>{ticket}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
