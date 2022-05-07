import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoodIcon from '@mui/icons-material/Mood';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
    icon?: React.ElementType;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;

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
        <IconButton>
          <MoodIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Contact Me
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto', }}
      >
        {sections.map((section) => (
            <>
                <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    href={section.url}
                    sx={{ p: 1, flexShrink: 0 }}
                >
                    <>
                        {section.icon && <section.icon key={section.title + '-icon'} />}
                        <span key={section.title + '-span'}>{section.title}</span>
                    </>
                </Link>
                
            </>
          
        ))}
      </Toolbar>
    </>
  );
}