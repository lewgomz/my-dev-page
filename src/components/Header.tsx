import { ElementType } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as routerLink } from 'react-router-dom';

interface Section {
  readonly title: string;
  readonly url: string;
  readonly routeType: string;
  readonly icon?: ElementType;
}

interface HeaderProps {
  sections: Section[];
  title: string;
  onToggleTheme: () => void;
  themeMode: 'light' | 'dark';
}

export default function Header(props: HeaderProps) {
  const { sections, title, onToggleTheme, themeMode } = props;

  const getLink = (section: Section) => {
    if (section.routeType === 'internal') {
      return <Link
            component={routerLink}
            color="text.primary"
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            sx={{ p: 1, flexShrink: 0 }}
        >
            <>
                {section.icon && <section.icon />}
                <span>{section.title}</span>
            </>
        </Link>
    } else {
      return <Link
        component="a"
        noWrap
        color="inherit"
        variant="body2"
        href={section.url}
        key={section.title}
        sx={{ p: 1, flexShrink: 0 }}
        target="_blank"
        rel="noreferrer">
        <>
          {section.icon && <section.icon />}
          <span>{section.title}</span>
        </>
      </Link>
    }
  };

  return (
    <>
      <Toolbar sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
        color: 'text.primary', }}>
        <Button size="small">Fun Stuff</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton onClick={onToggleTheme} aria-label="toggle theme">
          {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Button variant="outlined" size="small">
          Contact Me
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          overflowX: 'auto',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {sections.map((section) => (
            getLink(section)
        ))}
      </Toolbar>
    </>
  );
}
