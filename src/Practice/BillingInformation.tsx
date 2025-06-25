import { useForm, useField } from "@tanstack/react-form";
import { useState } from "react";
import Select from "react-select";
import usStates from "../json/usStates.json";
import { toast } from "react-hot-toast";
import { useScreenSize } from "../hooks/useScreenSize";
import { cn } from "../utils/cn";

export const BillingInformation = () => {
  const [cardType, setCardType] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { width } = useScreenSize();

  const form = useForm({
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiry: "",
      cardverificationvalue: "",
      email: "",
      country: "United States",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("Submitted billing info:", value);
        await new Promise((res) => setTimeout(res, 1000));

        toast.success("Billing information saved successfully!");
        setIsDirty(false);
      } catch {
        toast.error("Failed to save billing information.");
      }
    },
  });

  const validators = {
    email: ({ value }: { value: string }) =>
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ? "Please enter a valid email address."
        : undefined,

    cardNumber: ({ value }: { value: string }) => {
      if (!value) return "Card number is required";
      if (value.length < 16) return "Card number up to 16 digits";
    },

    expiry: ({ value }: { value: string }) => {
      if (!value) return "Expiry is required";
      const [month, year] = value.split("/");
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        return "Enter a valid expiration date";
      }
      const numericMonth = parseInt(month, 10);
      const numericYear = parseInt(year, 10);
      if (isNaN(numericMonth) || isNaN(numericYear)) {
        return "Enter a valid expiration date";
      }
      if (numericMonth < 1 || numericMonth > 12) {
        return "Enter a valid expiration date";
      }
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear() % 100;
      if (
        numericYear < currentYear ||
        (numericYear === currentYear && numericMonth < currentMonth)
      ) {
        return "Enter a valid expiration date";
      }
      return undefined;
    },

    cardholderName: ({ value }: { value: string }) => {
      if (!value) return "Cardholder name is required";
    },

    cvv: ({ value }: { value: string }) => {
      if (!value) return "CVV is required";

      if (value.length !== 3) return `CVV must be 3 digits`;
    },
    country: ({ value }: { value: string }) => {
      if (!value) return "Country is required";
    },
    address: () => {
      if (address1 === "") return "Address is required";
    },
    city: ({ value }: { value: string }) => {
      if (!value) return "City is required";
    },
    state: ({ value }: { value: string }) => {
      if (!value) return "State is required";
    },
    zip: ({ value }: { value: string }) => {
      if (!value) return "Zip is required";
    },
  };

  const cardNumberField = useField({
    name: "cardNumber",
    form,
    validators: {
      onChange: validators.cardNumber,
    },
  });

  const cardholderNameField = useField({
    name: "cardholderName",
    form,
    validators: {
      onChange: validators.cardholderName,
    },
  });

  const expiryField = useField({
    name: "expiry",
    form,
    validators: {
      onChange: validators.expiry,
    },
  });

  const cvvField = useField({
    name: "cardverificationvalue",
    form,
    validators: {
      onChange: validators.cvv,
    },
  });

  const emailField = useField({
    name: "email",
    form,
    validators: {
      onChange: validators.email,
    },
  });

  const countryField = useField({
    name: "country",
    form,
    validators: {
      onChange: validators.country,
    },
  });

  const addressField = useField({
    name: "address",
    form,
    validators: {
      onChange: validators.address,
    },
  });

  const cityField = useField({
    name: "city",
    form,
    validators: {
      onChange: validators.city,
    },
  });

  const stateField = useField({
    name: "state",
    form,
    validators: {
      onChange: validators.state,
    },
  });

  const zipField = useField({
    name: "zip",
    form,
    validators: {
      onChange: validators.zip,
    },
  });

  const detectCardType = (number: string): string | null => {
    const cleaned = number.replace(/\s+/g, "");
    if (/^4[0-9]{0,}$/.test(cleaned)) return "Visa";
    if (/^5[1-5][0-9]{0,}$/.test(cleaned)) return "MasterCard";
    return null;
  };
  const handleAddress1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress1 = e.target.value;
    setAddress1(newAddress1);
    addressField.setValue([newAddress1, address2].filter(Boolean).join(","));
  };

  const handleAddress2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress2 = e.target.value;
    setAddress2(newAddress2);
    addressField.setValue([address1, newAddress2].filter(Boolean).join(","));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    cardNumberField.setValue(cleaned);

    const detectedType = detectCardType(cleaned);
    setCardType(detectedType);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    expiryField.setValue(value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(e);
    setIsDirty(true);
  };

  return (
    <div className="h-full w-full px-4 md:px-20">
      <div
        className={cn("font-bold text-xl sm:text-3xl pb-8 md:pb-10 ", {
          "text-2xl": width! >= 400,
        })}
      >
        Practice 07: Billing Information
      </div>
      <form onSubmit={handleFormSubmit}>
        <p className="font-semibold text-xl">Billing Information</p>
        <p className="text-gray-500 text-sm mt-2">
          Update your billing details and addresss
        </p>
        <div className="flex justify-between border-gray-300 border-b pt-8 pb-4 flex-col gap-5 md:flex-row md:gap-0">
          <div className="w-full md:w-4/12">
            <p>Payment details</p>
          </div>
          <div className="w-full gap-5 flex flex-col md:w-8/12 ">
            <div className="space-y-2">
              <label htmlFor="cardNumber">Card Number</label>
              <div className="relative w-full h-10 items-center flex">
                {cardType && (
                  <div className="absolute">
                    <img
                      src={`Images/BillingInformation/CreditCard/${cardType.toLowerCase()}.svg`}
                      alt={cardType}
                      className="w-9 ml-3"
                    />
                  </div>
                )}
                <input
                  id="cardNumber"
                  value={
                    cardNumberField.state.value
                      .replace(/\D/g, "")
                      .match(/.{1,4}/g)
                      ?.join(" ") || ""
                  }
                  onChange={handleCardNumberChange}
                  className={`border py-2 w-full ${
                    cardType ? "px-14" : "px-3"
                  }`}
                  maxLength={19}
                  placeholder="1234 1234 1234 1234"
                />
              </div>
              {cardNumberField.state.meta.errors.length > 0 && isDirty && (
                <div className="text-red-500 text-sm font-semibold mt-1">
                  *{cardNumberField.state.meta.errors[0]}*
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input
                id="cardholderName"
                value={cardholderNameField.state.value}
                onChange={(e) => cardholderNameField.setValue(e.target.value)}
                className="border px-3 py-2 w-full"
                maxLength={20}
                placeholder="Full name on card"
              />
              {cardholderNameField.state.meta.errors.length > 0 && isDirty && (
                <div className="text-red-500 text-sm font-semibold mt-1">
                  *{cardholderNameField.state.meta.errors[0]}*
                </div>
              )}
            </div>
            <div className="flex justify-between gap-8">
              <div className="w-full space-y-2">
                <label htmlFor="expiry">Expiry</label>
                <input
                  id="expiry"
                  value={expiryField.state.value}
                  onChange={handleExpiryChange}
                  className="border px-3 py-2 w-full"
                  placeholder="MM / YY"
                />
                {expiryField.state.meta.errors.length > 0 && isDirty && (
                  <div className="text-red-500 text-sm font-semibold mt-1">
                    *{expiryField.state.meta.errors[0]}*
                  </div>
                )}
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="cardverificationvalue">CVV</label>
                <input
                  id="cardverificationvalue"
                  value={cvvField.state.value}
                  onChange={(e) => cvvField.setValue(e.target.value)}
                  className="border px-3 py-2 w-full"
                  maxLength={3}
                  placeholder="CVV"
                />
                {cvvField.state.meta.errors.length > 0 && isDirty && (
                  <div className="text-red-500 text-sm font-semibold mt-1">
                    *{cvvField.state.meta.errors[0]}*
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex border-gray-300 border-b pt-6 pb-4 flex-col gap-5 md:gap-0 md:justify-between md:flex-row">
          <div className="w-full md:w-4/12">
            <p>Email address</p>
          </div>
          <div className="w-full space-y-2 md:w-8/12 ">
            <label htmlFor="email">Email </label>
            <input
              id="email"
              type="email"
              value={emailField.state.value}
              onChange={(e) => emailField.setValue(e.target.value)}
              className="border px-3 py-2 w-full"
              placeholder="user@example.com"
            />
            {emailField.state.meta.errors.length > 0 && isDirty && (
              <div className="text-red-500 text-sm font-semibold mt-1">
                *{emailField.state.meta.errors[0]}*
              </div>
            )}
          </div>
        </div>
        <div className="flex border-gray-300 border-b pt-6 pb-4 gap-5 flex-col md:gap-0 md:justify-between md:flex-row">
          <div className="w-full md:w-4/12">
            <p>Address details</p>
          </div>
          <div className="w-full gap-5 flex flex-col md:w-8/12">
            <div className="space-y-2">
              <label htmlFor="country">Country / Region</label>
              <Select
                inputId="country"
                options={[{ value: "United States", label: "United States" }]}
                value={{ value: "United States", label: "United States" }}
                onChange={(selectedOption) => {
                  countryField.setValue(selectedOption?.value ?? "");
                }}
                className="w-full"
                classNamePrefix="react-select"
                isDisabled
                placeholder="United States"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address1">Address</label>
              <input
                id="address1"
                value={address1}
                onChange={handleAddress1Change}
                className="border px-3 py-2 w-full"
                placeholder="Street address"
              />
            </div>

            <div>
              <input
                id="address2"
                value={address2}
                onChange={handleAddress2Change}
                className="border px-3 py-2 w-full"
                placeholder="Apartment, suite, etc. (optional)"
              />
              {addressField.state.meta.errors.length > 0 && isDirty && (
                <div className="text-red-500 text-sm font-semibold mt-1">
                  *{addressField.state.meta.errors[0]}*
                </div>
              )}
            </div>
            <div className="flex justify-between gap-8 ">
              <div className="w-full space-y-2">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  value={cityField.state.value}
                  onChange={(e) => cityField.setValue(e.target.value)}
                  className="border px-3 py-2 w-full"
                  placeholder="City"
                />
                {cityField.state.meta.errors.length > 0 && isDirty && (
                  <div className="text-red-500 text-sm font-semibold mt-1">
                    *{cityField.state.meta.errors[0]}*
                  </div>
                )}
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="state">State</label>
                <Select
                  inputId="state"
                  options={usStates}
                  value={
                    usStates.find(
                      (option) => option.value === stateField.state.value
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    stateField.setValue(selectedOption?.value ?? "");
                  }}
                  className="w-full min-w-[100px]"
                  placeholder="State"
                />
                {stateField.state.meta.errors.length > 0 && isDirty && (
                  <div className="text-red-500 text-sm font-semibold mt-1">
                    *{stateField.state.meta.errors[0]}*
                  </div>
                )}
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="zip">Zip</label>
                <input
                  id="zip"
                  value={zipField.state.value.replace(/\D/g, "")}
                  onChange={(e) => zipField.setValue(e.target.value)}
                  className="border px-3 py-2 w-full"
                  placeholder="12345"
                  maxLength={5}
                />
                {zipField.state.meta.errors.length > 0 && isDirty && (
                  <div className="text-red-500 text-sm font-semibold mt-1">
                    *{zipField.state.meta.errors[0]}*
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-100 text-gray-400 font-semibold  rounded-lg py-4 w-48 mt-4 md:py-2 md:w-52"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
