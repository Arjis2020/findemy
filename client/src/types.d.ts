interface Common {
    _id: string,
    created_at: string
}

interface Course extends Common {
    title: string,
    shortDescription: string,
    detailedDescription: string,
    instructors: [Instructor],
    rating: number,
    totalRatings: number,
    totalHours: number,
    lectures: number,
    levels: [string],
    imageUrl: string,
    price: number,
    discountedPrice: number,
    requirements: [string],
    learnings: [string],
    totalArticles: number,
    totalVideoHours: number,
    totalDownloadableResources: number,
    categories: [string],
    slug: string,
}

interface User extends Common {
    name: string,
    email: string,
    password: string,
    cart: Array<Cart>
}

interface Instructor extends Common {
    name: string,
    gender: string,
    skills: [string],
    introduction: string,
    rating: number,
    reviews: number,
    students: number,
    courses: number,
    imageURL: string
}

interface Cart extends Common {
    course_id: string;
    user_id: string
}

interface CartOrders extends CartOrderMeta {
    orders: Array<Course>;
}

interface CartOrderMeta {
    totalDiscountedPrice: number;
    totalPrice: number;
    discountPercentage: number;
    discount: number
}