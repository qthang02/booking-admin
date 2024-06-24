import {RoomStatus} from "./type.ts";

export const GetRandomIntInclusive = (min: number, max: number): number =>  {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const GetRoomStatusFake = (): RoomStatus => {
    const num = GetRandomIntInclusive(0, 4);
    const status: RoomStatus[] = ["CHECKING", "EMPTY", "CHECKOUT", "PENDING", "CONFIRMED"];

    return status[num];
}

export const getRandomDate = (): Date => {
    const year = Math.floor(Math.random() * (2025 - 1970 + 1)) + 1970; // Random year between 1970 and 2024 (inclusive)
    const month = Math.floor(Math.random() * 12); // Random month (0-11)
    const day = Math.floor(Math.random() * (new Date(year, month + 1, 0).getDate())) + 1; // Random day within the chosen month

    return new Date(year, month, day);
}

const firstNames: string[] = ["Alice", "Bob", "Charlie", "David", "Emily", "Fiona", "George", "Henry", "Isabella", "Jack"];
const lastNames: string[] = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];

export const getRandomName = (): string => {
    const firstNameIndex = Math.floor(Math.random() * firstNames.length);
    const lastNameIndex = Math.floor(Math.random() * lastNames.length);

    return `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
}


export const getRandomEmail = (domain = "example.com"): string => {
    const nameLength = Math.floor(Math.random() * (12 - 6 + 1)) + 6; // Random name length between 6 and 12 characters
    const nameChars = "abcdefghijklmnopqrstuvwxyz0123456789_-."; // Allowed characters

    let randomName = "";
    for (let i = 0; i < nameLength; i++) {
        const randomIndex = Math.floor(Math.random() * nameChars.length);
        randomName += nameChars[randomIndex];
    }

    return `${randomName}@${domain}`;
}

export const getRandomPhoneNumber = (countryCode = "US", includeCountryCode = false): string => {
    // Area code (US: 3 digits, varies by country)
    const areaCode = Math.floor(Math.random() * (900 - 100 + 1)) + 100;

    // Exchange (US: 3 digits)
    const exchange = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    // Subscriber number (US: 4 digits)
    const subscriberNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    // Combine parts with separators (US format)
    const phoneNumber = `${areaCode}-${exchange}-${subscriberNumber}`;

    // Optionally prepend country code
    return includeCountryCode ? `+${countryCode} ${phoneNumber}` : phoneNumber;
}

export const getRandomAddress = (): string => {
    const streetNumbers = ["123", "456", "789", "1000"];
    const streetNames = ["Main St", "Elm St", "Pine Ave", "Oak Blvd"];
    const cityNames = ["Springfield", "Sunnyville", "Riverdale", "Westwood"];
    const states = ["CA", "NY", "TX", "FL"];
    const zipCodes = ["12345", "54321", "98765", "00000"];

    const randomStreetNumberIndex = Math.floor(Math.random() * streetNumbers.length);
    const randomStreetNameIndex = Math.floor(Math.random() * streetNames.length);
    const randomCityIndex = Math.floor(Math.random() * cityNames.length);
    const randomStateIndex = Math.floor(Math.random() * states.length);
    const randomZipCodeIndex = Math.floor(Math.random() * zipCodes.length);

    // Combine address parts with commas as separators
    return `${streetNumbers[randomStreetNumberIndex]} ${streetNames[randomStreetNameIndex]}, ${cityNames[randomCityIndex]}, ${states[randomStateIndex]} ${zipCodes[randomZipCodeIndex]}`;
}