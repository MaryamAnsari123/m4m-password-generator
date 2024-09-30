"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";

// Default export of the GeneratePasswordComponent function
export default function GeneratePassword() {
  // State hooks for managing password generation options and the generated password
  const [length, setLength] = useState<number>(8);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  // Handler for updating the length state on input change
  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(e.target.value));
  };

  // Function to generate a password based on selected options
  const generatePassword = (): void => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let allChars = "";
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars === "") {
      alert("Please select at least one character type."); // Alert if no character types are selected
      return;
    }
  
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex]; // Generate password character by character
    }
    setPassword(generatedPassword); // Set the generated password state
  };

  // Function to copy the password to the clipboard
  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password copied to clipboard!"); // Alert on successful copy
      },
      (err) => {
        console.error(err)
        alert("Failed to copy password to clipboard."); // Alert on failed copy
      }
    );
  };

  // Handler for updating the checkbox states
  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };

  // JSX return statement rendering the password generator UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Center the password generator card within the screen */}
      <Card className="w-full max-w-md bg-gradient-to-br to-yellow-400 from-slate-400 shadow-lg rounded-lg">
        <div className="mx-auto max-w-md">
          {/* Header with title and description */}
          <CardHeader>
            <CardTitle>
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-blue-700">Password Generator</h1>
            </div>
            </CardTitle>
            <CardDescription>
              <div className="text-center">
            <p className="text-white bg-black font-mono text-xs">
              Create a secure password with just a few clicks
            </p>
          </div>
          </CardDescription>
          </CardHeader>
          <CardContent>
          {/* Main content area for password options and input */}
          <div className="space-y-4">
            {/* Input for password length */}
            <div className="text-center">
              <Label htmlFor="length" className="text-2xl font-bold text-orange-900">Set Password Length 
              <p className="font-mono text-xs text-blue-800">8 to 32 (Characters limit)</p></Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={handleLengthChange}
                className="w-full bg-blue-600 text-yellow-400 font-bold text-base hover:bg-blue-400 mt-2"
              />
            </div>
            {/* Checkboxes for character type inclusion */}
            <div className="space-y-2 bg-green-300 p-4">
              <Label className="text-base font-bold text-orange-900"><u>Include:</u></Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={handleCheckboxChange(setIncludeNumbers)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={handleCheckboxChange(setIncludeSymbols)}
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>
            </div>
            {/* Button to generate password */}
            <Button type="button" className="w-full bg-green-500 hover:bg-yellow-200 text-black font-bold" onClick={generatePassword}>
              Generate Password
            </Button>
            {/* Display the generated password and button to copy */}
            <div className="space-y-2 text-center">
              <Label htmlFor="password" className="text-lg font-bold text-blue-500">Generated Password</Label>
              <div className="w-full text-center">
                <Input
                  id="password"
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1 bg-blue-700 text-white font-bold"
                />
                <CardFooter>
                  <div className="mt-6 w-full">
                <Button type="button" onClick={copyToClipboard} className="bg-indigo-700 hover:bg-indigo-500">
                  Copy to Clipboard
                </Button>
                </div>
              </CardFooter>
              <div>
                  <p className="font-mono">Made by <b>Maryam ansari</b></p>
                </div>
              </div>
            </div>
          </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}