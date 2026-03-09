// function UploadImage({ setImage }) {
//
//     function handleUpload(e) {
//
//         const file = e.target.files[0]
//
//         const formData = new FormData()
//
//         formData.append("file", file)
//
//         fetch("/upload", {
//             method: "POST",
//             body: formData
//         })
//             .then(res => res.json())
//             .then(data => {
//                 setImage(data.url)
//             })
//     }
//
//     return (
//         <input
//             type="file"
//             onChange={handleUpload}
//         />
//     )
// }
//
// export default UploadImage