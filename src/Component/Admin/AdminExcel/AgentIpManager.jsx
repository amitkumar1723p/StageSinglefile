import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AgentIpManager.css";
import { toast } from "react-toastify";

const AgentIpManager = () => {
    const [ips, setIps] = useState([]);
    const [filteredIp,setFilteredIp]=useState([])
    const [form, setForm] = useState({ ip: "", agentName: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [search,setSearch]=useState("")

    const apiUrl = process.env.REACT_APP_API_URL; 

    const fetchIps = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${apiUrl}/ip/all-agent-ip`,{
                withCredentials:true
            });
            if(res.data.success){
                setIps(res.data.allIp);
                setFilteredIp(res.data.allIp)
            }
        } catch (err) {
            handleError("Failed to fetch IPs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIps();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    useEffect(()=>{
        let filtering = [...ips];
        if(search){
            filtering = filtering.filter((ip)=>ip.AgentName.toLowerCase().includes(search.toLowerCase()))
        }
        setFilteredIp(filtering)
    },[search])
    const resetForm = () => {
        setForm({ ip: "", agentName: "" });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.ip || !form.agentName) {
            return setMessage({ type: "error", text: "All fields are required." });
        }

        setLoading(true);
        try {
            if (editingId) {
             const res=   await axios.put(`${apiUrl}/ip/update-agents-ip/${editingId}`, {
                    IP: form.ip,
                    AgentName: form.agentName,
                },{
                    withCredentials:true
                });
               if(res.data.success){
                toast.success("Updated successfully")
               }
            resetForm();

            } else {
           const res=     await axios.post(`${apiUrl}/ip/add-agent-ip`, {
                    ip: form.ip,
                    agentName: form.agentName,
                },{
                    withCredentials:true
                });
                if(res.data.success){
                    toast.success("Saved successfully")
                   }
            resetForm();

            }
            // resetForm();
            fetchIps();
        } catch (err) {
            resetForm();
            toast.error("Ip already Exists in DB !")
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (ip) => {
        setForm({ ip: ip.IP, agentName: ip.AgentName });
        setEditingId(ip._id);
        setMessage({ type: "", text: "" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this IP?")) return;
        setLoading(true);
        try {
           const res= await axios.put(`${apiUrl}/ip/delete-ip/${id}`,{},{
                withCredentials:true
            });
            if(res.data.success){
                toast.success("IP deleted successfully.")
               }
            fetchIps();
        } catch (err) {
            handleError("Failed to delete IP", err);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (msg, err) => {
        const errMsg = err.response?.data?.message || err.message || "Unexpected error";
        setMessage({ type: "error", text: `${msg}: ${errMsg}` });
    };

    return (
        <div className="agent-ip-container">
            <h2 className="agent-ip-title">Agent IP Manager</h2>

            <form onSubmit={handleSubmit} className="agent-ip-form">
                <input
                    type="text"
                    name="ip"
                    placeholder="Enter IP"
                    value={form.ip}
                    onChange={handleChange}
                    required
                    className="agent-ip-input"
                />
                <input
                    type="text"
                    name="agentName"
                    placeholder="Enter Agent Name"
                    value={form.agentName}
                    onChange={handleChange}
                    required
                    className="agent-ip-input"
                />
                <div className="agent-ip-buttons">
                    <button type="submit" disabled={loading} className="agent-ip-button">
                        {editingId ? "Update IP" : "Add IP"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="agent-ip-button cancel">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="agent-ip-subtitle-parent">
            <h3 className="agent-ip-subtitle">Saved IPs</h3>
                    
                    <input type="text" className="agent-ip-filter-search" placeholder="Search Agent " onChange={(e)=>setSearch(e.target.value)}/>
            </div>

            {loading ? (
                <p className="agent-ip-loading">Loading...</p>
            ) : (
                <table className="agent-ip-table">
                    <thead>
                        <tr>
                            <th>IP</th>
                            <th>Agent Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIp.map((ip) => (
                            <tr key={ip._id}>
                                <td>{ip.IP}</td>
                                <td>{ip.AgentName}</td>
                                <td>
                                    <button onClick={() => handleEdit(ip)} className="agent-ip-action edit">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(ip._id)} className="agent-ip-action delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AgentIpManager;
