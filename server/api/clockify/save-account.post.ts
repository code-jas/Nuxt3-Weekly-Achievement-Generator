
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

     setCookie(event, 'user', JSON.stringify(body))
    return body;
});
