type Params = {
    [x: string]: string
}

export const searchQueryParser = (prevParams: URLSearchParams, newParams: Params) => {
    const parsedPrevParams: Params = {}
    const entries = prevParams.entries()
    while (true) {
        const { value, done } = entries.next()
        if (done) break
        parsedPrevParams[value[0]] = value[1]
    }
    return {
        ...parsedPrevParams,
        ...newParams
    }
}