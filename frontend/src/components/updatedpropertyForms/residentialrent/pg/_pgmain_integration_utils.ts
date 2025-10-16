// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// export async function submitPgMain(formData: any, setIsSubmitting: (b: boolean) => void, setSubmitStatus: (s: string|null) => void, navigate?: (path: string) => void) {
//   setIsSubmitting(true);
//   setSubmitStatus(null);
//   try {
//     const user = sessionStorage.getItem('user');
//     if (!user) {
//       toast.error('You need to be logged in to create a listing');
//       if (navigate) navigate('/login');
//       setIsSubmitting(false);
//       return;
//     }
//     const userData = JSON.parse(user);
//     const userId = userData.id || userData._id;
//     const userName = userData.name || userData.username || '';
//     const token = sessionStorage.getItem('token');
//     const payload = {
//       ...formData,
//       metadata: {
//         ...formData.metadata,
//         userId,
//         userName,
//         createdAt: new Date().toISOString(),
//       }
//     };
//     // TODO: handle media upload if needed (base64 or URLs)
//     await axios.post('/api/residential/pgmain', payload, {
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     toast.success('PG listing created!');
//     setSubmitStatus('success');
//     // Optionally reset form or navigate
//     // if (navigate) navigate('/dashboard');
//   } catch (err: any) {
//     toast.error(err?.response?.data?.error || 'Failed to create listing');
//     setSubmitStatus(err?.response?.data?.error || 'Submission failed');
//   } finally {
//     setIsSubmitting(false);
//   }
// }
