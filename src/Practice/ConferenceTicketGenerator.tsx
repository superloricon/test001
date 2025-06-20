import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// interface FormValues {
//   name: string;
//   email: string;
//   username: string;
//   avatar: File | null;
// }

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [generateTicket, setGenerateTicket] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string>("#00000");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      avatar: null as File | null, // 明确类型
    },
    validationSchema,
    onSubmit: () => {
      // Generate ticket after form submission (for demo purposes)
      const random = Math.floor(10000 + Math.random() * 90000); // 保证5位
      setTicketNumber(`#${random}`);
      setGenerateTicket(true);
    },
  });

  return (
    <div className="h-full w-full">
      <div className="font-bold text-xl sm:text-3xl pb-8 md:pb-10 px-4 md:px-20">
        Practice 06: Conference Ticket Generator
      </div>
      <div className="w-full relative min-h-[844px]">
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
          <form onSubmit={formik.handleSubmit} className="text-white w-[450px]">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 justify-center font-bold ">
                <img
                  src="Images/CTicketGenerator/logo-mark.svg"
                  className="w-5 h-5"
                  alt="logo-mark"
                />
                <p>Coding Conf</p>
              </div>

              {!generateTicket ? (
                <div>
                  <p className="font-bold text-center mt-8 text-2xl max-w-[300px] sm:max-w-[500px] sm:text-3xl ">
                    Your Journey to Coding Conf 2025 Starts Here!
                  </p>
                  <p className="font-semibold text-gray-300 text-center mt-3 text-base max-w-[250px] sm:text-base sm:max-w-[450px] ">
                    Secure your spot at next year's biggest coding conference.
                  </p>
                  <div className="pt-8 flex flex-col gap-4">
                    {/* Avantar Field */}
                    <div>
                      <label
                        htmlFor="avatar"
                        className="block font-medium mb-2"
                      >
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
                                onClick={() =>
                                  formik.setFieldValue("avatar", null)
                                }
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
                        <div
                          className="text-red-500 text-sm mt-1"
                          id="avatarError"
                        >
                          {formik.errors.avatar}
                        </div>
                      ) : (
                        <div className="flex w-full gap-1 mt-2">
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
                        <div
                          className="text-red-500 text-sm mt-1"
                          id="nameError"
                        >
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
                        <div
                          className="text-red-500 text-sm mt-1"
                          id="emailError"
                        >
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    {/* userName Field */}
                    <div>
                      <label
                        htmlFor="username"
                        className="block font-medium mb-2"
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
                        className="bg-gray-500/20 mt-1 block w-full p-2 border border-gray-400  rounded-lg focus:outline-none text-white focus:ring-2 focus:ring-indigo-600 hover:bg-[#312361]"
                        aria-required="true"
                        aria-describedby="nameError"
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div
                          className="text-red-500 text-sm mt-1"
                          id="nameError"
                        >
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
                </div>
              ) : (
                <div>
                  <p className="font-bold text-center mt-8 text-2xl max-w-[300px] sm:max-w-[500px] sm:text-3xl ">
                    Congrats, Jonatan Kristof! Your ticket is ready.
                  </p>
                  <div className="flex ">
                    <p className="font-semibold text-gray-300 text-center mt-6 text-base max-w-[250px] sm:text-base sm:max-w-[450px] ">
                      We've emailed your ticket to
                    </p>
                    <p className="font-semibold text-gray-300 text-center mt-6 text-base max-w-[250px] sm:text-base sm:max-w-[450px] ">
                      janatan@email.com
                    </p>
                    <p className="font-semibold text-gray-300 text-center mt-6 text-base max-w-[250px] sm:text-base sm:max-w-[450px] ">
                      and will send updates in the run up to the event
                    </p>
                  </div>

                  <div className="relative mt-16">
                    <img
                      src="Images/CTicketGenerator/pattern-ticket.svg"
                      className="absolute"
                    />
                    <div className="flex justify-between rounded-lg ">
                      <div className="p-4 flex flex-col justify-between max-w-[340px] min-h-[210px]">
                        <div className="flex gap-3 font-bold ">
                          <img
                            src="Images/CTicketGenerator/logo-mark.svg"
                            className="w-7 h-7 mt-1"
                            alt="logo-mark"
                          />
                          <div className="flex flex-col gap-2">
                            <p className="text-2xl font-medium">Coding Conf</p>
                            <div className="text-xs text-gray-500 gap-2 flex">
                              <p>Jan 31, 2025</p> /<p> Austin,TX</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 font-bold items-center h-14">
                          {formik.values.avatar && (
                            <img
                              src={URL.createObjectURL(formik.values.avatar)}
                              alt="User Avatar"
                              className="w-14 object-cover rounded-full "
                            />
                          )}
                          <div className="flex flex-col gap-1 h-full justify-end">
                            <p className="text-xl font-medium">
                              {formik.values.name}
                            </p>
                            <div className="text-xs text-gray-500 gap-1 flex items-end">
                              <img
                                src="/Images/CTicketGenerator/icon-github.svg"
                                alt="icon-github"
                                className="size-4"
                              />
                              <p> {formik.values.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center rotate-90 min-w-1 text-[#8277a4] text-xl mr-2">
                        {ticketNumber}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
