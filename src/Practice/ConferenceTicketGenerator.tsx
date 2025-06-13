import { useRef, useState } from "react";
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
    .email("Please enter a valid email address")
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
    .test(
      "fileSize",
      "File too large. Please upload a photo under 500 KB",
      (value) => {
        if (value && value instanceof File) {
          return value.size <= 200 * 1024; // 200KB
        }
        return false;
      }
    ),
});

export const ConferenceTicketGenerator = () => {
  const [ticket, setTicket] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <div className="font-bold text-xl sm:text-3xl pb-8 md:pb-10 px-4 md:px-20">
        Practice 06: Conference Ticket Generator
      </div>
      <div className="w-full relative">
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

        <div className="flex justify-center py-10 px-4">
          <form
            onSubmit={formik.handleSubmit}
            className="text-white w-[450px] "
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 justify-center font-bold ">
                <img
                  src="Images/CTicketGenerator/logo-mark.svg"
                  className="w-5 h-5"
                  alt="logo-mark"
                />
                <p>Coding Conf</p>
              </div>
              <p className="font-bold text-center mt-8 text-2xl max-w-[300px] sm:max-w-[400px] sm:text-3xl ">
                Your Journey to Coding Conf 2025 Starts Here!
              </p>
              <p className="font-semibold text-gray-300 text-center mt-4 text-base max-w-[250px] sm:text-xl sm:max-w-[350px] ">
                Secure your spot at next year's biggest coding conference.
              </p>
            </div>
            <div className="pt-8 flex flex-col gap-4">
              {/* Avantar Field */}
              <div>
                <label htmlFor="avatar" className="block font-medium mb-2">
                  Upload Avatar
                </label>

                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg, image/jpg"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    formik.setFieldValue("avatar", file || null);
                  }}
                  onBlur={formik.handleBlur}
                  className="hidden"
                />

                <div
                  className="flex h-auto min-h-32 w-full border border-gray-300 border-dashed rounded-md items-center justify-center bg-[#1c163c] hover:bg-[#312361] flex-col p-4 cursor-pointer"
                  onClick={() => {
                    if (!formik.values.avatar) {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  {formik.values.avatar ? (
                    <div className="text-center w-full flex flex-col items-center">
                      {/* Image preview */}
                      <div className="h-20 w-full flex mb-2">
                        <img
                          src={URL.createObjectURL(formik.values.avatar)}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => formik.setFieldValue("avatar", null)}
                          className="px-3 py-1 text-sm bg-[#322e51] text-white rounded underline"
                        >
                          Remove Image
                        </button>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1 text-sm bg-[#322e51] text-white rounded"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
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
                </div>

                {/* 错误信息 */}
                {formik.touched.avatar && formik.errors.avatar ? (
                  <div className="text-red-500 text-sm mt-1" id="avatarError">
                    {formik.errors.avatar}
                  </div>
                ) : (
                  <div className="flex w-full gap-1 mt-4">
                    <img
                      src="Images/CTicketGenerator/icon-info.svg"
                      alt="icon-info"
                    />
                    <p className="text-gray-400 text-xs sm:text-base">
                      Upload your photo (JPG or PNG, max size: 500KB)
                    </p>
                  </div>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Full Name
                </label>
                <div className="border-[#a3a1b2] border rounded-lg p-0.5 mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-500/20  block w-full p-2 border border-[#474364] rounded-lg focus:outline-none text-white hover:bg-[#312361] focus:ring-2 focus:ring-indigo-600"
                    aria-required="true"
                    aria-describedby="nameError"
                  />
                </div>
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm mt-1" id="nameError">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-500/20 mt-1 block w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 text-white focus:ring-indigo-600 hover:bg-[#312361]"
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
                <label htmlFor="username" className="block font-medium mb-2">
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
                  className="bg-gray-500/20 mt-1 block w-full p-2 border border-gray-400  rounded-lg focus:outline-none text-white focus:ring-2 focus:ring-indigo-600 hover:bg-[#312361]"
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
                className="w-full py-2 bg-[#f67464] text-[#53283a] font-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-2"
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
