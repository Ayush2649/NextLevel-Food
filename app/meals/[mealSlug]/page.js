export default async function MealsSlug({params}) {
    const {mealSlug} = await params;
    return (
        <main>
            <h1>This is the dynamic route for meal</h1>
            <p>{mealSlug}</p>
        </main>
    )
}