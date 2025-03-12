import { useState, useEffect } from 'react'
import { GetListAllUser, ChangeUserStatus, ChangeUserRole } from "../../api/admin"
import useAwirutStore from "../../store/AwirutStore";
import { toast } from 'react-toastify';

const TableUser = () => {
    const token = useAwirutStore((s) => s.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        //code
        hldGetUsers(token)
    }, [token])

    const hldGetUsers = (token) => {
        GetListAllUser(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hldChangeStatus = (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }

        ChangeUserStatus(token, value)
            .then((res) => {
                console.log(res)
                hldGetUsers(token)
                toast.success('Update Status Success')
            })
            .catch(err => console.log(err))
    }

    const hldChangeRole = (userId, userRole) => {
        console.log(userId, userRole)
        const value = {
            id: userId,
            role: userRole
        }

        ChangeUserRole(token, value)
            .then((res) => {
                console.log(res)
                hldGetUsers(token)
                toast.success('Update Role Success')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ลำดับ</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">State</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">จัดการ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        users?.map((el, index) => (
                            <tr key={el.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{el.email}</td>
                                <td className="px-4 py-2">
                                    <select
                                        onChange={(e) => hldChangeRole(el.id, e.target.value)}
                                        value={el.role}
                                        className="px-2 py-1 border border-gray-300 rounded-md"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {el.enabled ? 'Active' : 'Inactive'}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className={`px-4 py-1 rounded-md text-white ${el.enabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}`}
                                        onClick={() => hldChangeStatus(el.id, el.enabled)}
                                    >
                                        {el.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableUser
