import CoursesIcon from '../layout/Menu/icons/cources.svg'
import BooksIcon from '../layout/Menu/icons/books.svg'
import ServicesIcon from '../layout/Menu/icons/services.svg'
import ProductIcon from '../layout/Menu/icons/products.svg'
import { TopLevelCategory } from '../interfaces/page.interface'
import { FirstLevelMenuItem } from '../interfaces/menu.interface'

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'cources', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'products', name: 'Товары', icon: <ProductIcon />, id: TopLevelCategory.Products },
]
