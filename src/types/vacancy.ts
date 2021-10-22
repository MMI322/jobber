type KeySkill = {
    name: string
}

type Address = {
    city: string
}

type Salary = {
    from?: number,
    to?: number,
    gross?: boolean,
    currency: string
}

type Employer = {
    id: string,
    name: string,
    description?: string,
    logo_urls: {
        '90': string,
        '240': string,
        original: string
    }
}

export type Vacancy = {
    id: string,
    description: string,
    key_skills?: KeySkill[],
    address?: Address,
    salary?: Salary,
    name: string,
    employer?: Employer
    snippet: {
        responsibility: string,
        requirement: string
    }
}
