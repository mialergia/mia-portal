export default function handler(req, res) {
    // Authenticate user
    const userAuth = {
        username: 'example',
        permissions: ['viewPatients', 'viewReports']
    };
    res.status(200).json(userAuth);
}