'use client'
import * as React from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { DialogProps } from "@radix-ui/react-dialog"
import { useMediaQuery } from "usehooks-ts"

interface Props extends DialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ResponsiveDialog(props: Props) {
  const { trigger, title, description, children, ...rest } = props;
  // const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog {...rest}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="grainy-bg before:!opacity-15 overflow-hidden sm:max-w-[425px]">
        <div className="relative z-10">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer {...rest}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="grainy-bg before:!opacity-15 overflow-hidden">
        <div className="relative z-10 px-4">
          <DrawerHeader className="text-left mb-6">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {description}
            </DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter className="mt-16">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
