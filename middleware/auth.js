import jwt from "jsonwebtoken";

const secret = 'test';

// const auth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const isCustomAuth = token.length < 500;

//         let decodedData;

//         if (token && isCustomAuth) {
//             decodedData = jwt.verify(token, secret);

//             req.userId = decodedData?.id;
//         } else {
//             decodedData = jwt.decode(token);

//             req.userId = decodedData?.sub;
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//     }
// };


const auth = async (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        const decoded = jwt.decode(token);


        if (token && isCustomAuth) {
            let decodedData = jwt.verify(token, secret);

            req.userId = decodedData?.id;
        }
        else if (decoded.iss === 'https://accounts.google.com') {
            let decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;


// {
//     "result": {
//         "_id": "642491bcc28a38bbe95a5028",
//         "name": "Jon Wick",
//         "email": "jon@wick.com",
//         "password": "$2a$12$G6qo4wXgeSC1xrEMpLZZpeXehdztKQSYmsQ5PE2iZqxmlF6dJkeKm",
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvbkB3aWNrLmNvbSIsImlkIjoiNjQyNDkxYmNjMjhhMzhiYmU5NWE1MDI4IiwiaWF0IjoxNjgwNDM4NTIzLCJleHAiOjE2ODA0NDIxMjN9.K2sehGwC4CqBrYHSNonwE0GdohDf-PMCcRSNLTvnYXA"
// }

// {
//     "result": {
//         "iss": "https://accounts.google.com",
//         "nbf": 1680438292,
//         "aud": "269014533764-01vonncfbf3kdd3gnh1pm29h6ggvkgjr.apps.googleusercontent.com",
//         "sub": "105555299126351964526",
//         "email": "aditya249645@gmail.com",
//         "email_verified": true,
//         "azp": "269014533764-01vonncfbf3kdd3gnh1pm29h6ggvkgjr.apps.googleusercontent.com",
//         "name": "aditya patil",
//         "picture": "https://lh3.googleusercontent.com/a/AGNmyxaH05QgkFYdaLl9f3_4Vs0W-Hf-dIbi9wT4Spc9Mw=s96-c",
//         "given_name": "aditya",
//         "family_name": "patil",
//         "iat": 1680438592,
//         "exp": 1680442192,
//         "jti": "6cff3550c3a5728d0d859a8b97721f111c7c47e8"
//     }
// }