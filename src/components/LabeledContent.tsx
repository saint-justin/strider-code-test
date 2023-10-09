import { Box, Link, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface LabeledContentProps {
  label: string;
  content: string;

  linkPath?: string;
  emphasize?: boolean;
}

const LabeledContent = ({ label, content, linkPath, emphasize }: LabeledContentProps) => {
  const em = emphasize !== undefined ? emphasize : false;
  const navigate = useNavigate();

  return (
    <Box mb={ em ? 3 : 1}>
      <Typography sx={{ fontSize: 14 }} color='text.secondary'>{label}</Typography>
      <Typography 
        variant={em ? 'h5' : 'h6'}
        sx={{ fontSize: em ? 24 : 16 }}
        fontWeight={em ? 800 : 400}>
        
        { 
          linkPath
          ? <Link underline={'hover'} onClick={() => navigate(linkPath)} sx={{ cursor: 'pointer'}}>{content}</Link>
          : content
        }
      </Typography>
    </Box>
  )
}

export default LabeledContent;