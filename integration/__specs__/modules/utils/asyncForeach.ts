export async function asyncForEach<T>(array: T[], callback: (element: T) => Promise<void>): Promise<void> {
    for (const element of array) {
        await callback(element);
    }
}
