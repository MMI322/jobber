import { Vacancy } from './vacancy'

type Pagination = {
    per_page: number,
    page: number,
    pages: number,
    found: number,
}

export type Vacancies = Pagination & {
    items: Vacancy[]
}
