export const userRedirect = (id: number, history: any) => {
    let path = '/profile/' + id
    history.push(path)
}