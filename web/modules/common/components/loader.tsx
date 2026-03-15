'use client'
import LoadingSML from '@/assets/loading.svg'
import { SVGProps } from 'react';

export default function Loader(props: SVGProps<SVGAElement>){
  return <LoadingSML {...props}/>;
};