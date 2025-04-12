import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  ExpandMore,
  ExpandLess,
  House,
  ChildFriendlyRounded,
  BadgeRounded,
  School,
  Streetview,
  Psychology as PsychologyIcon,
  SportsKabaddi,
  FileCopy,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  PointOfSale as PointOfSaleIcon,
  Category as CategoryIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Store as StoreIcon,
  AddBusiness as AddBusinessIcon,
  Announcement as AnnouncementIcon,
  Summarize as SummarizeIcon,
} from '@mui/icons-material';

import PortraitIcon from '@mui/icons-material/Portrait';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import TableViewIcon from '@mui/icons-material/TableView';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
const drawerWidth = 250;


const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;


  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


const Sidebar = ({
  open,
  handleClick,
  open2,
  handleClickAttendance,
  open3,
  handleClickPayroll,
  open4,
  handleClickForms,

}) => {
  const userRole = getUserRole();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.href = '/';
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (item) => {setSelectedItem(item);};



  return (
      <Drawer
        className="no-print"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '17%',
            boxSizing: 'border-box',
            backgroundColor: '#white',
          },
        }}
      >
      <Toolbar />
      <List>
      <ListItem 
  button 
  component={Link} 
  to='/home' 
  sx={{ 
    color: selectedItem === 'home' ? 'white' : 'black',
    bgcolor: selectedItem === 'home' ? '#6c0b19' : 'inherit', 
    '&:hover': { 
      bgcolor: '#6c0b19', 
      color: 'white',
      '& .MuiListItemIcon-root, & .MuiSvgIcon-root': {
        color: 'white',
      }
    },
    '& .MuiListItemIcon-root, & .MuiSvgIcon-root': {
      color: selectedItem === 'home' ? 'white' : 'black',
    }
  }}
  onClick={() => handleItemClick('home')}
>
  <ListItemIcon>
    <House sx={{ fontSize: 29, marginLeft: '-6%' }} />
  </ListItemIcon>
  <ListItemText 
    primary="Home" 
    sx={{ marginLeft: '-25px' }} 
  />
</ListItem>




        {userRole !== 'staff' && (
          <>
            <ListItem
              button
              onClick={handleClick}
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboards" sx={{marginLeft: '-25px'}} />
              <ListItemIcon sx={{ marginLeft: '10rem', color: 'black' }}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            </ListItem>


            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button 
                  component={Link} 
                  to= '/personalinfo' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'personalinfo' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'personalinfo' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('personalinfo')} 
                >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'personalinfo' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <PortraitIcon />
                  </ListItemIcon>
                  <ListItemText primary="Personal Information" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button 
                  component={Link} 
                  to= '/children' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'children' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'children' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('children')} 
                >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'children' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Children Information" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem 
                  button 
                  component={Link} 
                  to= '/college' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'college' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'college' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('college')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'college' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary="College Information" sx={{marginLeft: '-10px'}} />
                </ListItem>


                <ListItem 
                  button 
                  component={Link} 
                  to= '/other-information' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'other-information' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'other-information' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('other-information')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'other-information' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Other Information" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem 
                  button 
                  component={Link} 
                  to= '/workexperience' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'workexperience' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'workexperience' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('workexperience')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'work-experience' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <AddHomeWorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Work Experience" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem 
                  button 
                  component={Link} 
                  to= '/vocational' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'vocational' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'vocational' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('vocational')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'vocational' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <Streetview />
                  </ListItemIcon>
                  <ListItemText primary="Vocational" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem 
                  button 
                  component={Link} 
                  to= '/learningdev' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'learningdev' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'learningdev' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('learningdev')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'learningdev' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <PsychologyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Learning and Development" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem 
                  button 
                  component={Link} 
                  to= '/voluntarywork' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'voluntarywork' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'voluntarywork' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('voluntarywork')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'voluntarywork' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <SportsKabaddi />
                  </ListItemIcon>
                  <ListItemText primary="Voluntary Work" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                 <ListItem 
                  button 
                  component={Link} 
                  to= '/eligibility' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'eligibility' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'eligibility' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('eligibility')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'eligibility' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Eligibility" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
          </> 
        )}


        <ListItem
          button
          onClick={handleClickAttendance}
          sx={{ color: 'black', cursor: 'pointer' }}
        >
          <ListItemIcon>
            <TableViewIcon />
          </ListItemIcon>
          <ListItemText primary="Records" sx={{marginLeft: '-25px'}}/>
          <ListItemIcon sx={{ marginLeft: '10rem', color:'black' }}>
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItem>


        {userRole !== 'staff' && (
          <>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem 
                  button 
                  component={Link} 
                  to= '/view_attendance' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'view_attendance' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'view_attendance' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('view_attendance')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'view_attendance' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="View Attendance" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                 <ListItem 
                  button 
                  component={Link} 
                  to= '/search_attendance' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'search_attendance' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'search_attendance' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('search_attendance')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'search_attendance' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Search Attendance" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
             <ListItem 
                  button 
                  component={Link} 
                  to= '/daily_time_record' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'daily_time_record' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'daily_time_record' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('daily_time_record')} 
                  >
              <ListItemIcon sx={{ marginRight: '-1rem',
                 color: selectedItem === 'daily_time_record' ? 'white' : 'inherit',
                 '&:hover': { color: 'white' }
               }}>
                <BadgeRounded />
              </ListItemIcon>
              <ListItemText primary="Daily Time Record" sx={{marginLeft: '-10px'}}/>
            </ListItem>
          </List>
        </Collapse>


        {userRole !== 'staff' && (
          <>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem 
                  button 
                  component={Link} 
                  to= '/daily_time_record_faculty' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'daily_time_record_faculty' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'daily_time_record_faculty' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('daily_time_record_faculty')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'daily_time_record_faculty' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Daily Faculty Time Record" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                 <ListItem 
                  button 
                  component={Link} 
                  to= '/attendance_form' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'attendance_form' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'attendance_form' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('attendance_form')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'attendance_form' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Form"sx={{marginLeft: '-10px'}} />
                </ListItem>
              </List>
            </Collapse>

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem 
                  button 
                  component={Link} 
                  to= '/attendance_module' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'attendance_module' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'attendance_module' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('attendance_module')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'attendance_module' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Module Non-teaching Staff" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
            
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem 
                  button 
                  component={Link} 
                  to= '/attendance_module_faculty' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'attendance_module_faculty' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'attendance_module_faculty' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('attendance_module_faculty')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'attendance_module_faculty' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Module Faculty (30hrs)" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                 <ListItem 
                  button 
                  component={Link} 
                  to= '/attendance_module_faculty_40hrs' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'attendance_module_faculty_40hrs' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'attendance_module_faculty_40hrs' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('attendance_module_faculty_40hrs')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'attendance_module_faculty_40hrs' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Module Faculty (Designated)" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem 
                  button 
                  component={Link} 
                  to= '/attendance_summary' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'attendance_summary' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'attendance_summary' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('attendance_summary')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'attendance_summary' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Summary" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                 <ListItem 
                  button 
                  component={Link} 
                  to= '/official_time' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'official_time' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'official_time' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('official_time')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'official_time' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Official Time Form" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        <List>
          <ListItem 
                  button 
                  component={Link} 
                  to= '/pds1' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'pds1' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'pdsfile' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('pds1')} 
                  >
            <ListItemIcon sx={{ marginRight: '-1rem',
               color: selectedItem === 'pds1' ? 'white' : 'inherit',
               '&:hover': { color: 'white' }
             }}>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="PDS1" sx={{marginLeft: '-10px'}}/>
          </ListItem>
        </List>
        <List>
          <ListItem 
                  button 
                  component={Link} 
                  to= '/pds2' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'pds2' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'pdsfile' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('pds2')} 
                  >
            <ListItemIcon sx={{ marginRight: '-1rem',
              color: selectedItem === 'pds2' ? 'white' : 'inherit',
              '&:hover': { color: 'white' }
             }}>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="PDS2" sx={{marginLeft: '-10px'}}/>
          </ListItem>
        </List>
        <List>
          <ListItem 
                  button 
                  component={Link} 
                  to= '/pds3' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'pds3' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'pdsfile' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('pds3')} 
                  >
            <ListItemIcon sx={{ marginRight: '-1rem',
               color: selectedItem === 'pds3' ? 'white' : 'inherit',
               '&:hover': { color: 'white' }
             }}>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="PDS3" sx={{marginLeft: '-10px'}}/>
          </ListItem>
        </List>


        {userRole !== 'staff' && (
          <>
            <ListItem
              button
              onClick={handleClickPayroll}
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              <ListItemIcon>
                <RequestQuoteIcon />
              </ListItemIcon>
              <ListItemText primary="Payroll Management" sx={{ marginLeft: '-25px' }} />
              <ListItemIcon sx={{ marginLeft: '10rem',
                
               }}>
                {open3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            </ListItem>

            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                 <ListItem 
                  button 
                  component={Link} 
                  to= '/payroll-table' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'payroll-table' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'payroll-table' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('payroll-table')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                     color: selectedItem === 'payroll-table' ? 'white' : 'inherit',
                     '&:hover': { color: 'white' }
                   }}>
                    <PointOfSaleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payroll" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/remittance-table' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'remittance-table' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'remittance-table' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('remittance-table')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'remittance-table' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <PointOfSaleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Remittances" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/item-table' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'item-table' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'item-table' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('item-table')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'item-table' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }

                   }}>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Item Table" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/salary-grade' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'salary-grade' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'salary-grade' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('salary-grade')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'salary-grade' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' } 
                  }}>
                    <CurrencyExchangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Salary Grade Table" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/salary-grade-status' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'salary-grade-status' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'salary-grade-status' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('salary-grade-status')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'salary-grade-status' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <CurrencyExchangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Salary Grade Status" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/department-table' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'department-table' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'department-table' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('department-table')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'department-table' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Department" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/department-assignment' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'department-assignment' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'department-assignment' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('department-assignment')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'department-assignment' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <AddBusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Department Assignment" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/leave-table' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'leave-table' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'leave-table' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('leave-table')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'leave-table' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }

                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Leave" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/leave-assignment' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'leave-assignment' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'leave-assignment' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('leave-assignment')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'leave-assignment' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Leave Assignment" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/holiday-suspension' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'holiday-suspension' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'holiday-suspension' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('holiday-suspension')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'holiday-suspension' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <AnnouncementIcon />
                  </ListItemIcon>
                  <ListItemText primary="Holiday and Suspension" sx={{ marginLeft: '-10px' }} />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}


        {userRole !== 'staff' && (
          <>
            <ListItem
              button
              onClick={handleClickForms}
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Forms" sx={{ marginLeft: '-25px' }} />
              <ListItemIcon sx={{ marginLeft: '10rem' }}>
                {open4 ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            </ListItem>

            <Collapse in={open4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem 
                  button 
                  component={Link} 
                  to= '/assessment-clearance' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'assessment-clearance' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'assessment-clearance' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('assessment-clearance')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'assessment-clearance' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Assessment Clearance" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/clearance' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'clearance' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'clearance' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('clearance')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'clearance' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clearance" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/faculty-clearance' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'faculty-clearance' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'faculty-clearance' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('faculty-clearance')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'faculty-clearance' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Faculty Clearance" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/hrms-request-forms' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'hrms-request-forms' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'hrms-request-forms' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('hrms-request-forms')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'hrms-request-forms' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="HRMS Request Form" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/individual-faculty-loading' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'individual-faculty-loading' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'individual-faculty-loading' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('individual-faculty-loading')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'individual-faculty-loading' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Individual Faculty Loading" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/in-service-training' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'in-service-training' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'in-service-training' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('in-service-training')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'in-service-training' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="In Service Training" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/leave-card' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'leave-card' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'leave-card' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('leave-card')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'leave-card' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }

                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employee's Leave Card" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/locator-slip' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'locator-slip' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'locator-slip' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('locator-slip')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'locator-slip' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Locator's Slip" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/permission-to-teach' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'permission-to-teach' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'permission-to-teach' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('permission-to-teach')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'permission-to-teach' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }

                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Permission To Teach" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/request-for-id' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'request-for-id' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'request-for-id' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('request-for-id')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'request-for-id' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Request For ID" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/saln-front' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'saln-front' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'saln-front' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('saln-front')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                  color: selectedItem === 'saln-front' ? 'white' : 'inherit',
                  '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="S.A.L.N" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/scholarship-agreement' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'scholarship-agreement' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'scholarship-agreement' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('scholarship-agreement')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'scholarship-agreement' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scholarship Agreement" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem 
                  button 
                  component={Link} 
                  to= '/subject' 
                  sx={{ color: 'black', bgcolor: selectedItem === 'subject' ? '#6c0b19' : 'inherit', '&:hover': { bgcolor: '#6c0b19', color: 'white' }, color: selectedItem === 'subject' ? 'white' : 'inherit',
                  }}
                  onClick={() => handleItemClick('subject')} 
                  >
                  <ListItemIcon sx={{ marginRight: '-1rem',
                    color: selectedItem === 'subject' ? 'white' : 'inherit',
                    '&:hover': { color: 'white' }
                   }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subject Still to be Taken" sx={{ marginLeft: '-10px' }} />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

      

        <ListItem button sx={{ cursor: 'pointer' }} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ marginLeft: '-25px' }}/>
        </ListItem>
      </List>
    </Drawer>
  );
};


export default Sidebar;



