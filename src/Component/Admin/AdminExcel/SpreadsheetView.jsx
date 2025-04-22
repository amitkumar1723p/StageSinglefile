
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Box, Typography, CircularProgress,
  Button, IconButton, Tooltip, Paper, Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl,
  TextField, Select, InputLabel, FormControlLabel, Checkbox, FormGroup,
  Snackbar, Alert,
  Chip
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { VariableSizeGrid as Grid } from 'react-window';
import io from 'socket.io-client'; // Import Socket.io client
import ".././OwnerAgentExcelData.css"
import FilterDialog from './FilterDialog';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { removeExcelFromAdminAction } from '../../../Action/postAction';
// Socket URL - use environment variable in production
const SOCKET_URL = process.env.REACT_APP_API_URL;

// Custom Cell component
const Cell = ({ columnIndex, rowIndex, style, data }) => {

  if (columnIndex === 0) {
    return (
      <div
        style={{
          ...style,
          boxSizing: 'border-box',
          border: '1px solid #ddd',
          padding: '6px',
          backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          // textOverflow: 'ellipsis',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#666'
        }}
      >
        {rowIndex + 1}
      </div>
    );
  }
  const handleFocus = () => {
    console.log('Cell focused:', rowIndex, columnKey);
    if (!isLocked && data.onfocus) {
      data.onfocus(rowIndex, columnKey);
    }
  };
  // Adjust columnIndex to get the actual column (subtract 1 because of seq column)
  const actualColumnIndex = columnIndex - 1;

  const { rows, columns, onCellChange, editingCell, setEditingCell,
    editValue, setEditValue, saveEdit, handleKeyPress, onfocus ,fontSize} = data;

  const row = rows[rowIndex];
  const column = columns[actualColumnIndex];
  const columnKey = column?.name;
  const columnType = column?.type || 'text';
  const cellValue = row?.[columnKey];
  const isLocked = column?.locked;

  const isEditing = editingCell &&
    editingCell.rowIndex === rowIndex &&
    editingCell.columnName === columnKey;

  const handleMouseEnter = (e) => {
    // Don't show tooltip if editing
    if (isEditing) return;

    // Get value to display in tooltip
    let displayValue = cellValue !== null && cellValue !== undefined ? cellValue : '';

    // Convert to string if not already
    if (typeof displayValue !== 'string') {
      displayValue = String(displayValue);
    }

    // Only show tooltip if the content is meaningful
    if (displayValue.trim().length > 0) {
      const tooltip = document.getElementById('spreadsheet-tooltip');
      if (tooltip) {
        tooltip.textContent = displayValue;
        tooltip.style.display = 'block';

        // Calculate if tooltip would go off screen and adjust positioning
        const maxWidth = window.innerWidth - 20;
        const maxHeight = window.innerHeight - 20;
        const tooltipWidth = 250;

        // Adjust X position if would go off right side
        let posX = e.clientX + 15;
        if (posX + tooltipWidth > maxWidth) {
          posX = e.clientX - tooltipWidth - 20;
        }

        // Adjust Y position if would go off bottom
        let posY = e.clientY + 10;
        const tooltipHeight = tooltip.offsetHeight;
        if (posY + tooltipHeight > maxHeight) {
          posY = maxHeight - tooltipHeight;
        }

        tooltip.style.left = `${posX}px`;
        tooltip.style.top = `${posY}px`;
      }
    }
  };

  const handleMouseLeave = () => {
    const tooltip = document.getElementById('spreadsheet-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  };
  const startEditing = () => {
    if (isLocked) return;
    setEditingCell({ rowIndex, columnName: columnKey });
    setEditValue(cellValue !== null && cellValue !== undefined ? cellValue : '');
  };

  // Handle different cell types
  const renderCellContent = () => {
    switch (columnType) {
      case 'checkbox':
        return (
          <Checkbox
            checked={Boolean(cellValue)}
            onChange={(e) => onCellChange(rowIndex, columnKey, e.target.checked)}
            disabled={isLocked}
            onFocus={(e) => onfocus(rowIndex, columnKey)}
          />
        );

      case 'dropdown':
        const options = column.options || [];
        return (
          <FormControl fullWidth size="small" disabled={isLocked}>
            <Select
              value={cellValue || ''}
              onChange={(e) => onCellChange(rowIndex, columnKey, e.target.value)}
              onFocus={() => onfocus(rowIndex, columnKey)}

              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'date':
        if (isEditing) {
          return (
            <TextField
              type="date"
              fullWidth
              size="small"
              value={editValue || ''}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={saveEdit}

              autoFocus
              onFocus={() => onfocus(rowIndex, columnKey)}

            />
          );
        }
        return cellValue || '';

      case 'number':
        if (isEditing) {
          return (
            <TextField
              type="number"
              fullWidth
              size="small"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={saveEdit}
              autoFocus
              onFocus={() => onfocus(rowIndex, columnKey)}

            />
          );
        }
        return cellValue !== null && cellValue !== undefined ? cellValue : '';

      case 'text':
      default:
        if (columnType === 'text' || columnType === 'number' || columnType === 'date') {
          if (isEditing) {
            return (
              <div style={{ ...style, }}>
                <TextField
                  fullWidth

                  size="small"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={saveEdit}
                  autoFocus
                  onFocus={handleFocus} // Use the handler here
                />
              </div>
            );
          }
        }
        return cellValue !== null && cellValue !== undefined ? cellValue : '';
    }
  };

  return (
    <div
      style={{
        ...style,
        boxSizing: 'border-box',
        border: '1px solid #ddd',
        padding: isEditing ? '2px' : '6px',
        backgroundColor: isLocked ? '#f0f0f0' : (rowIndex % 2 === 0 ? '#fff' : '#f9f9f9'),
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: "nowrap",
        fontSize:fontSize,
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "200px", // set width for truncation to take effect
        display: "block"
      }}
      onClick={() => !isLocked && !isEditing && startEditing()}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      {renderCellContent()}
    </div>
  );
};

// Custom HeaderCell component
const HeaderCell = ({ columnIndex, style, data }) => {
  const { columns, handleColumnClick, sortConfig, filters } = data;

  // Special case for sequence number column (columnIndex === 0)
  if (columnIndex === 0) {
    return (
      <div
        style={{
          ...style,
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          fontWeight: 'bold',
          backgroundColor: '#f3f3f3',
          padding: '6px',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span>#</span>
      </div>
    );
  }

  // Adjust columnIndex to get the actual column (subtract 1 because of seq column)
  const actualColumnIndex = columnIndex - 1;
  const column = columns[actualColumnIndex];
  const columnName = column?.name;
  const isLocked = column?.locked;

  const getSortIcon = () => {
    if (sortConfig.key !== columnName) return null;
    return sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };

  const getFilterIcon = () => {
    return filters[columnName] ? <FilterListIcon color="primary" fontSize="small" /> : <FilterListIcon fontSize="small" />;
  };

  return (
    <div
      style={{
        ...style,
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        fontWeight: 'bold',
        backgroundColor: isLocked ? '#e0e0e0' : '#f3f3f3',
        padding: '6px',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }}
      onClick={(e) => handleColumnClick(e, columnName)}
    >
      <span>{columnName}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {isLocked && <LockIcon fontSize="small" style={{ color: '#555' }} />}
        {getFilterIcon()}
        {getSortIcon()}
      </div>
    </div>
  );
};

const SpreadsheetView = () => {
  const { id } = useParams();
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pendingUpdates, setPendingUpdates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredIndices, setFilteredIndices] = useState(null);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnContextMenu, setColumnContextMenu] = useState(null);
  const [newColumnDialogOpen, setNewColumnDialogOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState('text');
  const [dropdownOptions, setDropdownOptions] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [doneByUser, setDoneByUser] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const [filterdAdmins, setFilterAdmin] = useState([]);
  const [AssinedAdmins, setAssignedAdmins] = useState([]);
  const [isFullScreen, setFullScreen] = useState(false);
  const [fontSize,setfontSize]=useState(14);
  
  const navigate = useNavigate();

  // Socket.io reference
  const socketRef = useRef(null);
  // Grid reference for refreshing
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  // console.log(medata)

  useEffect(() => {
     
    
    if (medata) {
      if (medata?.user?.Role === "Owner") {
        fetchSpreadsheetData();
        getAllAdminsAgents({ AgentVerify: true });
        getAllAdminsAgents({ AdminVerify: true });
      }
      else {

        fetchSingleFileData()
      }
    }



    // Initialize Socket.io connection
    socketRef.current = io(SOCKET_URL);

    // Join spreadsheet room
    socketRef.current.emit('joinSpreadsheet', id);

    // Listen for cell updates from other users
    socketRef.current.on('cellUpdates', (data) => {
      handleRemoteCellUpdates(data.updates);
    });

    // Listen for column lock changes
    socketRef.current.on('columnLockChanged', (data) => {
      handleRemoteColumnLockChange(data);
    });

    // Listen for new rows
    socketRef.current.on('rowAdded', (data) => {
      handleRemoteRowAdded(data);
    });

    // Listen for new columns
    socketRef.current.on('columnAdded', (data) => {
      handleRemoteColumnAdded(data);
    });
    socketRef.current.on('cellEditing', ({ cell, user }) => {
      console.log(`${user.name} is editing cell [${cell.rowIndex}, ${cell.columnKey}]`);
      // Optionally highlight that cell or show user's name on UI
      // setEditingStatus((prev) => ({
      //   ...prev,
      //   [`${cell.rowIndex}-${cell.columnKey}`]: user.name
      // }));
    });

    // Listen for cell editing stopped by another user
    socketRef.current.on('cellEditingStopped', ({ cell }) => {
      console.log("dtopped", `${cell.rowIndex}-${cell.columnKey}`)
      // setEditingStatus((prev) => {
      //   const updated = { ...prev };
      //   delete updated[`${cell.rowIndex}-${cell.columnKey}`];
      //   return updated;
      // });
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      // Clear any pending debounced saves
      saveChanges.flush();
    };
  }, [medata]);

  async function getAllAdminsAgents(Keyword) {
    try {
      let url;
      if (Keyword) {
        url = `${process.env.REACT_APP_API_URL}/admin-owner/admin-data?${Object.keys(Keyword)[0]
          }=${Keyword[Object.keys(Keyword)[0]]}`;
      } else {
        url = `/admin-owner/admin-data`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      setAllAdmins((prev) => {
        return [...prev, ...data.Admin]
      });

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // Create tooltip element if it doesn't exist
    if (!document.getElementById('spreadsheet-tooltip')) {
      const tooltip = document.createElement('div');
      tooltip.id = 'spreadsheet-tooltip';
      tooltip.style.cssText = `
        position: fixed;
        display: none;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        max-width: 250px;
        max-height: 100px;
        overflow: auto;
        word-break: break-word;
        pointer-events: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        font-size: 14px;
        z-index: 9999;
      `;
      document.body.appendChild(tooltip);
    }

    // Clean up on component unmount
    return () => {
      const tooltip = document.getElementById('spreadsheet-tooltip');
      if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    };
  }, []);
  // Throttle function to limit how often a function runs
  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Utility functions for tooltip
  const showTooltip = (text, x, y) => {
    const tooltip = document.getElementById('spreadsheet-tooltip');
    if (!tooltip) return;

    tooltip.textContent = text;
    tooltip.style.display = 'block';

    // Calculate if tooltip would go off screen and adjust positioning
    const maxWidth = window.innerWidth - 20;
    const maxHeight = window.innerHeight - 20;
    const tooltipWidth = 250;

    // Adjust X position if would go off right side
    let posX = x + 15;
    if (posX + tooltipWidth > maxWidth) {
      posX = x - tooltipWidth - 20;
    }

    // Adjust Y position if would go off bottom
    let posY = y + 10;
    const tooltipHeight = tooltip.offsetHeight;
    if (posY + tooltipHeight > maxHeight) {
      posY = maxHeight - tooltipHeight;
    }

    tooltip.style.left = `${posX}px`;
    tooltip.style.top = `${posY}px`;
  };

  const hideTooltip = () => {
    const tooltip = document.getElementById('spreadsheet-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  };

  // Throttled update function for mouse movement
  const updateTooltipPosition = throttle((x, y) => {
    const tooltip = document.getElementById('spreadsheet-tooltip');
    if (!tooltip || tooltip.style.display === 'none') return;

    // Get current text to maintain it
    const text = tooltip.textContent;
    showTooltip(text, x, y);
  }, 30); // Update at most every 30ms

  useEffect(() => {
    const handleMouseMove = (e) => {
      updateTooltipPosition(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hideTooltip(); // Make sure to hide tooltip on unmount
    };
  }, []);

  useEffect(() => {
    if (spreadsheet && allAdmins.length > 0) {
      // console.log("in saddad ",spreadsheet)
      const agentIdsSet = new Set(AssinedAdmins?.map(agent => agent.AdminId._id));
      // Find common AdminIds
      // console.log(agentIdsSet)
      const matchingAdmins = allAdmins.filter(admin => agentIdsSet.has(admin._id));
      setFilterAdmin(matchingAdmins);

      // const agentIdsSet = new Set(AssinedAdmins.map(agent => agent.AdminId._id));

      // // Find common AdminIds
      // const matchingAdmins = allAdmins.filter(admin => agentIdsSet.has(admin._id));

      // setFilterAdmin(matchingAdmins)
    }
  }, [allAdmins, spreadsheet]);

  //preventing screen shots and copying
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent Developer Tools
      console.log(event)
      if (event.key==="Escape") {
        event.preventDefault();
      setFullScreen(false);
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
      setFullScreen(true);
      }
      if (
        event.key === "F12" || // F12 Key
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") || // Ctrl + Shift + I
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") || // Ctrl + Shift + J
        (event.ctrlKey && event.key.toLowerCase() === "u") // Ctrl + U (View Source) 
        || (event.shiftKey && event.metaKey)
      ) {
        event.preventDefault();

        setIsHidden(true);

        // alert("Screenshot detected! Your activity is being monitored.");

        setTimeout(() => {
          setIsHidden(false);
        }, 2000); // Restore UI after 2 seconds
      }

      // Prevent Printing (Ctrl + P)
      if (event.ctrlKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setIsHidden(true);

        // alert("Screenshot detected! Your activity is being monitored.");

        setTimeout(() => {
          setIsHidden(false);
        }, 2000); // Restore UI after 2 seconds
      }

      // Prevent Snipping Tool (Win + Shift + S)
      if (event.shiftKey && event.metaKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        setIsHidden(true);

        // alert("Screenshot detected! Your activity is being monitored.");

        setTimeout(() => {
          setIsHidden(false);
        }, 2000); // Restore UI after 2 seconds
      }
    };

    const handlePrintScreen = (event) => {
      if (event.key === "PrintScreen") {
        event.preventDefault();
        setIsHidden(true);

        // alert("Screenshot detected! Your activity is being monitored.");

        setTimeout(() => {
          setIsHidden(false);
        }, 2000); // Restore UI after 2 seconds
      }
    };

    const handleRightClick = (event) => {
      event.preventDefault();
      alert("Right-click is disabled!");
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handlePrintScreen);
    document.addEventListener("contextmenu", handleRightClick);

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handlePrintScreen);
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  const onfocus = useCallback((rowIndex, columnKey) => {
    console.log('Cell focus triggered:', rowIndex, columnKey);

    if (!socketRef.current) {
      console.error('Socket not initialized when trying to emit cellEditing');
      return;
    }

    if (!socketRef.current.connected) {
      console.error('Socket not connected when trying to emit cellEditing');
      return;
    }

    const eventData = {
      spreadsheetId: id,
      cell: { rowIndex, columnKey },
      user: { id: medata?.user?._id || "poprfuture id", name: medata?.user?.Name || "prop future" }
    };

    console.log('Emitting cellEditing event with data:', eventData);
    socketRef.current.emit('cellEditing', eventData);
  }, [id, medata]);

  useEffect(() => {
    if (!doneByUser && notification.message.length > 0)
      toast.info(notification.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }, [notification]);

  // Handle remote updates received from Socket.io
  const handleRemoteCellUpdates = (updates) => {
    // Skip if these are our own updates
    if (pendingUpdates.some(update =>
      updates.some(remoteUpdate =>
        remoteUpdate.rowIndex === update.rowIndex &&
        remoteUpdate.field === update.field
      )
    )) {
      return;
    }

    // Apply remote updates to our data
    setData(prevData => {
      const newData = [...prevData];
      updates.forEach(update => {
        if (newData[update.rowIndex]) {
          newData[update.rowIndex] = {
            ...newData[update.rowIndex],
            [update.columnName]: update.newValue
          };
        }
      });
      return newData;
    });

    // Show notification
    // setNotification({
    //   open: true,
    //   message: 'Changes received from another user',
    //   severity: 'info'
    // });
  };

  const handleRemoteColumnLockChange = (data) => {
    const { columnName, locked } = data;

    // Update columns state
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.name === columnName ? { ...col, locked } : col
      )
    );

    // Show notification
    setNotification({
      open: true,
      message: `Column "${columnName}" was ${locked ? 'locked' : 'unlocked'} by another user`,
      severity: 'info'
    });
  };

  const handleRemoteRowAdded = (data) => {
    const { rowData } = data;

    // Add row to data
    setData(prevData => [...prevData, rowData]);

    // Show notification
    setNotification({
      open: true,
      message: 'New row added by another user',
      severity: 'info'
    });
  };

  const handleRemoteColumnAdded = (data) => {
    const { column, defaultValue } = data;

    // Update our data to include the new column
    setData(prevData => {
      return prevData.map(row => ({
        ...row,
        [column.name]: defaultValue
      }));
    });

    // Update columns state
    setColumns(prevColumns => [...prevColumns, column]);

    // Show notification
    setNotification({
      open: true,
      message: `New column "${column.name}" added by another user`,
      severity: 'info'
    });
  };

  const fetchSpreadsheetData = async () => {
    setDoneByUser(true);
    try {
      setLoading(true);
      let response;

      // Use appropriate API endpoint based on user role

      response = await axios.get(`${process.env.REACT_APP_API_URL}/excel/owner/file/${id}`, { withCredentials: true });

      //  else {
      //   response = await axios.get(`${process.env.REACT_APP_API_URL}/excel/file/${id}`, { withCredentials: true });
      // }

      // Set all state
      setAssignedAdmins(response.data.admins)
      setSpreadsheet(response.data.fileData);
      setColumns(response.data.fileData.columns);
      setData(response.data.fileData.data);
      setFilteredData(response.data.fileData.data);
      setFilteredIndices(null); // Reset filtered indices
    } catch (error) {
      console.error('Error fetching spreadsheet:', error);
      setNotification({
        open: true,
        message: 'Error loading spreadsheet: ' + (error.response?.data?.error || error.message),
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDoneByUser(false);
      }, 500);
    }
  };


  const fetchSingleFileData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/excel/file/${id}`, { withCredentials: true });
      setSpreadsheet(response.data.fileData);
      setColumns(response.data.fileData.columns);
      setData(response.data.fileData.data);
      setFilteredData(response.data.fileData.data);
      setFilteredIndices(null); // Reset filtered indices
    } catch (err) {
      navigate("/admin/dashboard")
      window.location.reload();
      console.error("Error fetching file data:", err);
    }
  };



  // Apply filters to data
  useEffect(() => {
    if (!data || data.length === 0) return;

    let result = [...data];
    let indices = [];

    // First collect indices of all rows that match the filters
    data.forEach((row, index) => {
      let includeRow = true;

      // Check each filter
      for (const key of Object.keys(filters)) {
        const filter = filters[key];
        if (!filter) continue; // Skip null filters (cleared ones)

        if (filter.type === 'text' && filter.value) {
          const cellValue = String(row[key] || '').toLowerCase();
          if (!cellValue.includes(filter.value.toLowerCase())) {
            includeRow = false;
            break;
          }
        } else if (filter.type === 'number') {
          if (filter.min !== null && Number(row[key] || 0) < filter.min) {
            includeRow = false;
            break;
          }
          if (filter.max !== null && Number(row[key] || 0) > filter.max) {
            includeRow = false;
            break;
          }
        }
      }

      if (includeRow) {
        indices.push(index);
      }
    });

    // Get the filtered data using indices
    result = indices.map(index => data[index]);

    // Apply sorting
    if (sortConfig.key) {
      // Sort both the filtered data and keep track of indices
      const sortedWithIndices = result.map((item, index) => ({
        item,
        originalIndex: indices[index]
      }));

      sortedWithIndices.sort((a, b) => {
        const aValue = a.item[sortConfig.key] || '';
        const bValue = b.item[sortConfig.key] || '';

        // Check if values are numbers
        const aNum = Number(aValue);
        const bNum = Number(bValue);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // String comparison
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      // Update filtered data and indices
      result = sortedWithIndices.map(item => item.item);
      indices = sortedWithIndices.map(item => item.originalIndex);
    }

    setFilteredData(result);
    setFilteredIndices(indices.length > 0 ? indices : null);
  }, [data, filters, sortConfig]);

  const handleColumnClick = (e, columnName) => {
    setAnchorEl(e.currentTarget);
    setColumnContextMenu(columnName);
  };

  const closeColumnMenu = () => {
    setAnchorEl(null);
    setColumnContextMenu(null);
  };

  const handleCellChange = useCallback((rowIndex, field, value) => {
    // Get the actual index if we're looking at filtered data
    console.log((rowIndex))
    const actualIndex = filteredIndices ? filteredIndices[rowIndex] : rowIndex;

    // Update the main data array
    setData(prevData => {
      const newData = [...prevData];
      newData[actualIndex] = {
        ...newData[actualIndex],
        [field]: value
      };
      return newData;
    });

    // IMPORTANT: Update the filtered data too so UI reflects changes immediately
    if (filteredIndices) {
      setFilteredData(prevFiltered => {
        const newFiltered = [...prevFiltered];
        // Find the correct row in filtered data (which matches rowIndex)
        newFiltered[rowIndex] = {
          ...newFiltered[rowIndex],
          [field]: value
        };
        return newFiltered;
      });
    }

    // Add to pending updates
    setPendingUpdates(prev => [
      ...prev,
      { rowIndex: actualIndex, field, value }
    ]);
  }, [filteredIndices]);

  const saveEdit = useCallback(() => {
    if (editingCell) {
      console.log('Saving edit for cell:', editingCell);
      const actualRowIndex = filteredIndices ? filteredIndices[editingCell.rowIndex] : editingCell.rowIndex;
      handleCellChange(editingCell.rowIndex, editingCell.columnName, editValue);

      // Emit cellEditingStopped event when editing is done
      if (socketRef.current && socketRef.current.connected) {
        const stopEditingData = {
          spreadsheetId: id,
          cell: { rowIndex: editingCell.rowIndex, columnKey: editingCell.columnName },
          user: { id: medata?.user?._id || "user123", name: medata?.user?.Name || "ankit" }
        };

        console.log('Emitting cellEditingStopped event with data:', stopEditingData);
        socketRef.current.emit('cellEditingStopped', stopEditingData);
      } else {
        console.error('Cannot emit cellEditingStopped: socket not connected');
      }

      setEditingCell(null);
    }
  }, [editingCell, editValue, handleCellChange, filteredIndices, id, medata]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  }, [saveEdit]);

  // Debounced save function to avoid too many API calls
  const saveChanges = useCallback(debounce(async () => {
    if (pendingUpdates.length === 0) return;

    try {
      setIsSaving(true);
      setDoneByUser(true);

      const updates = pendingUpdates.map(update => ({
        rowIndex: update.rowIndex,
        columnName: update.field,
        newValue: update.value
      }));

      // Use updated endpoint from second code
      // console.log(updates)
    const res=  await axios.put(`${process.env.REACT_APP_API_URL}/excel/file/${id}/update`, {
        updates
      }, { withCredentials: true });

      setPendingUpdates([]);
      console.log(res)
      setNotification({
        open: true,
        message: 'Changes saved successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      if(error?.response?.data?.success===false){
        navigate("/admin/dashboard")
        window.location.reload();

      }
      setNotification({
        open: true,
        message: 'Error saving changes: ' + (error.response?.data?.error || error.message),
        severity: 'error'
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setDoneByUser(false);
      }, 500);
    }
  }, 1000), [pendingUpdates, id]);

  // Auto-save when there are pending updates
  useEffect(() => {
    if (pendingUpdates.length > 0) {
      saveChanges();
    }

    // Cleanup function to ensure final save when component unmounts
    return () => {
      saveChanges.flush();
    };
  }, [pendingUpdates, saveChanges]);

  const manualSave = () => {
    saveChanges.flush();
  };

  const handleSort = (columnName) => {
    closeColumnMenu();

    let direction = 'asc';
    if (sortConfig.key === columnName && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === columnName && sortConfig.direction === 'desc') {
      // Reset sort
      setSortConfig({ key: null, direction: null });
      return;
    }

    setSortConfig({ key: columnName, direction });
  };

  const openFilterDialog = (columnName) => {
    setActiveFilterColumn(columnName);
    setFilterDialogOpen(true);
    closeColumnMenu();
  };

  const handleApplyFilter = (columnName, filterOptions) => {
    setFilters(prev => ({
      ...prev,
      [columnName]: filterOptions
    }));
    setFilterDialogOpen(false);
  };

  const handleClearFilter = (columnName) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[columnName];
      return newFilters;
    });
    closeColumnMenu();
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  const handleToggleColumnLock = async (columnName) => {
    closeColumnMenu();

    // Find column and toggle lock status
    const column = columns.find(col => col.name === columnName);
    if (!column) return;

    const newLockStatus = !column.locked;

    try {
      setDoneByUser(true);
      // Update column lock in database
      await axios.put(`${process.env.REACT_APP_API_URL}/excel/file/${id}/column/${columnName}/lock`, {
        locked: newLockStatus
      }, { withCredentials: true });

      // Update local state
      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.name === columnName ? { ...col, locked: newLockStatus } : col
        )
      );

      // Emit column lock change via socket
      if (socketRef.current) {
        socketRef.current.emit('columnLockChanged', {
          spreadsheetId: id,
          columnName,
          locked: newLockStatus,
          user: { id: medata?.user?._id || "user123", name: medata?.user?.Name || "ankit" }
        });
      }

      setNotification({
        open: true,
        message: `Column "${columnName}" ${newLockStatus ? 'locked' : 'unlocked'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error toggling column lock:', error);
      setNotification({
        open: true,
        message: 'Error updating column lock status',
        severity: 'error'
      });
    } finally {
      setTimeout(() => {
        setDoneByUser(false);
      }, 500);
    }
  };


  const handleAddRow = async () => {
    try {
      setDoneByUser(true);
      const newRow = {};
      columns.forEach(col => {
        // Set default values based on column type
        switch (col.type) {
          case 'checkbox':
            newRow[col.name] = false;
            break;
          case 'number':
            newRow[col.name] = 0;
            break;
          default:
            newRow[col.name] = '';
        }
      });

      // Add row to database
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/excel/file/${id}/row`, {
        rowData: newRow
      }, { withCredentials: true });

      // Update local state with the row returned from server
      const savedRow = response.data.row;
      setData(prevData => [...prevData, savedRow]);

      // Emit row added via socket
      if (socketRef.current) {
        socketRef.current.emit('rowAdded', {
          spreadsheetId: id,
          rowData: savedRow,
          user: { id: medata?.user?._id || "user123", name: medata?.user?.Name || "ankit" }
        });
      }

      setNotification({
        open: true,
        message: 'New row added successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding row:', error);
      setNotification({
        open: true,
        message: 'Error adding new row',
        severity: 'error'
      });
    } finally {
      setTimeout(() => {
        setDoneByUser(false);
      }, 500);
    }
  };

  const handleAddColumn = async () => {
    if (!newColumnName.trim()) {
      setNotification({
        open: true,
        message: 'Column name cannot be empty',
        severity: 'error'
      });
      return;
    }

    // Check for duplicate column name
    if (columns.some(col => col.name === newColumnName)) {
      setNotification({
        open: true,
        message: 'Column name already exists',
        severity: 'error'
      });
      return;
    }

    try {
      setDoneByUser(true);
      let options = [];
      if (newColumnType === 'dropdown' && dropdownOptions.trim()) {
        options = dropdownOptions.split(',').map(opt => opt.trim());
      }

      const newColumn = {
        name: newColumnName,
        type: newColumnType,
        locked: false
      };

      if (options.length > 0) {
        newColumn.options = options;
      }

      // Default value for the new column
      let defaultValue;
      switch (newColumnType) {
        case 'checkbox':
          defaultValue = false;
          break;
        case 'number':
          defaultValue = 0;
          break;
        default:
          defaultValue = '';
      }

      // Add column to database
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/excel/file/${id}/column`, {
        column: newColumn,
        defaultValue
      }, { withCredentials: true });

      // Update local state with the column returned from server
      const savedColumn = response.data.column;
      // setColumns(prevColumns => [...prevColumns, savedColumn]);

      // // Update data to include the new column
      // setData(prevData => {
      //   return prevData.map(row => ({
      //     ...row,
      //     [savedColumn.name]: defaultValue
      //   }));
      // });

      // Emit column added via socket
      if (socketRef.current) {
        socketRef.current.emit('columnAdded', {
          spreadsheetId: id,
          column: savedColumn,
          defaultValue,
          user: { id: medata?.user?._id || "user123", name: medata?.user?.Name || "ankit" }
        });
      }

      setNewColumnDialogOpen(false);
      setNewColumnName('');
      setNewColumnType('text');
      setDropdownOptions('');

      setNotification({
        open: true,
        message: 'New column added successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding column:', error);
      setNotification({
        open: true,
        message: 'Error adding new column',
        severity: 'error'
      });
    } finally {
      setTimeout(() => {
        setDoneByUser(false);
      }, 500);
    }
  };

  const handleDownloadCsv = async () => {
    try {
      setIsDownloading(true);
      setDoneByUser(true);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/excel/file/${id}/export/csv`, {
        responseType: 'blob',
        withCredentials: true
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${spreadsheet.name}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setNotification({
        open: true,
        message: 'File downloaded successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      setNotification({
        open: true,
        message: 'Error downloading file',
        severity: 'error'
      });
    } finally {
      setIsDownloading(false);
      setTimeout(() => {
        setDoneByUser(false);
      }, 500);
    }
  };

  const handleRemoveExcelFromAdmin = async (admin) => {
    try {
      dispatch(removeExcelFromAdminAction(admin._id, id));
      toast.success("Admin removed from Excel successfully");
      // Update the list of admins
      setFilterAdmin(prev => prev.filter(a => a._id !== admin._id));
    } catch (error) {
      console.error('Error removing admin:', error);
      toast.error("Failed to remove admin from Excel");
    }
  };

  // Handle notification close
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (loading && !spreadsheet) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', width: '95vw', alignItems: 'center', height: '95vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  const rowCount = filteredData?.length || 0;
  const columnCount = columns?.length || 0;
  const totalColumnCount = columnCount + 1; // Add 1 for the sequence number column
  const rowHeight = 40;
  const getColumnWidth = index => (index === 0 ? 60 : 200); // Sequence column is narrower
  const totalGridWidth = 65 + (columnCount * 200); // 60px for seq column + rest for data columns
  const gridHeight = Math.min(510, rowCount * rowHeight + rowHeight); // Add rowHeight for header

  // Calculate total and filtered rows count
  const totalRows = data?.length || 0;
  const filteredRows = filteredData?.length || 0;
  const isFiltered = Object.keys(filters).length > 0;
  if (isHidden) {
    return (
      <Container>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336' }}>
            SCREENSHOT DETECTED
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Taking screenshots or using developer tools is not allowed for security reasons.
          </Typography>
        </Box>
      </Container>
    );
  }
  return (
    !isHidden &&

    <div style={{ width: `${isFullScreen? '100vw':'99vw'}`, margin: "auto",overflow:"hidden", userSelect: "none" }} >
      {
        !isFullScreen ? <><div className="top-bar">
          <p>{spreadsheet?.name}</p>
         
        <div style={{display:"flex", gap:"10px"}}>
        <button onClick={() => {
            setFullScreen(!isFullScreen)
          }}>Full screen</button>

          <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
            <p style={{fontSize:"20px" ,cursor:"pointer"}} onClick={()=>setfontSize(fontSize-1)}>-</p>
            <p style={{padding:"5px 8px", border:"1px solid black",borderRadius:"5px"}}>{fontSize}</p>
            <p style={{fontSize:"20px" ,cursor:"pointer"}} onClick={()=>setfontSize(fontSize+1)}>+</p>
          </div>
        </div>

          <div className="button-group">
            {
              medata?.user?.Role === "Owner" && <>
                <button className="excel-btn primary" onClick={handleAddRow}>
                  ➕ Add Row
                </button>

                <button className="excel-btn outlined" onClick={() => setNewColumnDialogOpen(true)}>
                  ➕ Add Column
                </button></>
            }

            <button
              className="excel-btn outlined"
              onClick={handleClearAllFilters}
              disabled={Object.keys(filters).length === 0}
            >
              🔍 Clear Filters
            </button>

            <button
              className="excel-btn outlined"
              onClick={manualSave}
              disabled={pendingUpdates.length === 0 || isSaving}
            >
              💾 Save Changes
            </button>

            {
              medata?.user?.Role === "Owner" && <button
                className="excel-btn outlined"
                onClick={handleDownloadCsv}
                disabled={isDownloading}
              >
                ⬇️ Export CSV
              </button>
            }
          </div>
        </div>

          {/* Spreadsheet Info */}
          <div className="spreadsheet-info">
              <div style={{display:"flex",gap:"20px", marginBottom:"10px"}}>
                      {/* <p>Description: {spreadsheet.description || 'No description provided'}</p> */}
                      <p>Created: {new Date(spreadsheet.createdAt).toLocaleString()}</p>
                      <p>Last updated: {new Date(spreadsheet.updatedAt).toLocaleString()}</p>
              </div>
            <div>

                <p>
                  {isFiltered
                    ? `Showing ${filteredRows} of ${totalRows} rows`
                    : `Total rows: ${totalRows}`}
                </p>
                </div>
          </div>

          {/* Admins with Access */}
          {
            medata?.user?.Role === "Owner" && <div className="admin-section">
              <div className='excel-admin-chips'>
                <h3>Admins with Access:</h3>
                <div className="admin-chips">
                  {filterdAdmins.length > 0 ? (
                    filterdAdmins.map(admin => (
                      <div key={admin._id} className="admin-chip">
                        {admin.Name || admin.Email}
                        <button onClick={() => handleRemoveExcelFromAdmin(admin)}>✖</button>
                      </div>
                    ))
                  ) : (
                    <p>No admins have access to this spreadsheet.</p>
                  )}
                </div>
              </div>
          
            </div>
          }


          <Paper
            sx={{
              // height: 'calc(100% - 10px)',
              width: '100vw',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
              <div style={{ width: totalGridWidth, height: gridHeight+61, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                  <Grid
                    columnCount={totalColumnCount}
                    rowCount={1}
                    columnWidth={getColumnWidth}
                    rowHeight={index => rowHeight}
                    height={rowHeight}
                    width={totalGridWidth}
                    itemData={{ columns, handleColumnClick, sortConfig, filters }}
                    style={{ overflow: 'hidden' }}
                  >
                    {HeaderCell}
                  </Grid>
                </div>

                {/* Body */}
                <Grid
                  ref={gridRef}
                  columnCount={totalColumnCount}
                  rowCount={rowCount}
                  columnWidth={getColumnWidth}
                  rowHeight={index => rowHeight}
                  height={gridHeight + rowHeight}
                  width={totalGridWidth+5}
                  itemData={{
                    rows: filteredData,
                    columns,
                    onCellChange: handleCellChange,
                    editingCell,
                    setEditingCell,
                    editValue,
                    setEditValue,
                    saveEdit,
                    handleKeyPress,
                    onfocus: onfocus,
                    fontSize

                  }}
                >
                  {Cell}
                </Grid>
              </div>
            </div>
          </Paper></>


          : 
          //full screen mode
          <Paper
            sx={{
              
              width: '100vw',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position:"absolute",
              top:0,
              zIndex:16
            }}
          >
            <div style={{ width: '100%', height: '100vh', overflow: 'scroll' }}>
              <div style={{ width: totalGridWidth, height: 720, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                  <Grid
                    columnCount={totalColumnCount}
                    rowCount={1}
                    columnWidth={getColumnWidth}
                    rowHeight={index => rowHeight}
                    height={rowHeight}
                    width={totalGridWidth}
                    itemData={{ columns, handleColumnClick, sortConfig, filters }}
                    style={{ overflow: 'hidden' }}
                  >
                    {HeaderCell}
                  </Grid>
                </div>

                {/* Body */}
                <Grid
                  ref={gridRef}
                  columnCount={totalColumnCount}
                  rowCount={rowCount}
                  columnWidth={getColumnWidth}
                  rowHeight={index => rowHeight}
                  height={gridHeight + rowHeight+200}
                  width={totalGridWidth+5}
                  itemData={{
                    rows: filteredData,
                    columns,
                    onCellChange: handleCellChange,
                    editingCell,
                    setEditingCell,
                    editValue,
                    setEditValue,
                    saveEdit,
                    handleKeyPress,
                    onfocus: onfocus,
                    fontSize
                  }}
                >
                  {Cell}
                </Grid>
              </div>
            </div>
          </Paper>

      }
      {/* Column Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeColumnMenu}
      >
        <MenuItem onClick={() => handleSort(columnContextMenu)}>
          {sortConfig.key === columnContextMenu && sortConfig.direction === 'asc' ? (
            <>Sort Descending <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} /></>
          ) : sortConfig.key === columnContextMenu && sortConfig.direction === 'desc' ? (
            <>Clear Sort</>
          ) : (
            <>Sort Ascending <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} /></>
          )}
        </MenuItem>
        <MenuItem onClick={() => openFilterDialog(columnContextMenu)}>
          Filter {filters[columnContextMenu] && '(active)'}
        </MenuItem>
        {columnContextMenu && columns.find(col => col.name === columnContextMenu)?.locked ? (
          <MenuItem onClick={() => handleToggleColumnLock(columnContextMenu)}>
            Unlock Column <LockOpenIcon fontSize="small" sx={{ ml: 1 }} />
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleToggleColumnLock(columnContextMenu)}>
            Lock Column <LockIcon fontSize="small" sx={{ ml: 1 }} />
          </MenuItem>
        )}
      </Menu>

      {/* Filter Dialog */}
      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        column={activeFilterColumn}
        currentFilter={filters[activeFilterColumn] || {}}
        onApply={handleApplyFilter}
        data={data}
      />

      {/* New Column Dialog */}
      <Dialog
        open={newColumnDialogOpen}
        onClose={() => setNewColumnDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Column</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Column Name"
              fullWidth
              variant="outlined"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="column-type-select-label">Column Type</InputLabel>
              <Select
                labelId="column-type-select-label"
                value={newColumnType}
                label="Column Type"
                onChange={(e) => setNewColumnType(e.target.value)}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="dropdown">Dropdown</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
              </Select>
            </FormControl>
          </Box>


          {newColumnType === 'dropdown' && (
            <Box sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                label="Dropdown Options (comma separated)"
                fullWidth
                variant="outlined"
                value={dropdownOptions}
                onChange={(e) => setDropdownOptions(e.target.value)}
                placeholder="Option 1, Option 2, Option 3"
                helperText="Enter options separated by commas"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewColumnDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddColumn} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpreadsheetView;