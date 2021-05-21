interface ICreateUserDTO {
    id?: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    driver_license: string;
}

export { ICreateUserDTO };
