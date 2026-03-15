import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/modules/common/components/ui/dialog"
import { Button } from "@/modules/common/components/ui/button"
import { useState, useRef, useEffect } from "react"
import client from "@/lib/api/client"
import { useQueryClient } from "@tanstack/react-query"
import { ImageIcon, VideoIcon, MusicIcon, BarChart2Icon, ArrowLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/modules/common/components/ui/textarea"

export function CreatePostModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const queryClient = useQueryClient()

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  const handleSubmit = async (status: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED') => {
    try {
      setIsLoading(true)
      await client.POST("/feed/posts", {
        body: { 
          content,
          status 
        }
      })
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      queryClient.invalidateQueries({ queryKey: ['my-posts'] })
      onOpenChange(false)
      setContent("")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] md:rounded-none flex flex-col justify-start h-full p-0" closeIcon={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the world
          </DialogDescription>
        </DialogHeader>
        <div className="w-full border-b px-4 py-1 flex items-center h-fit justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              size="sm"
              variant="outline"
              onClick={() => handleSubmit('DRAFT')}
              disabled={!content.trim() || isLoading}
            >
              Save as Draft
            </Button>
            <Button
              size="sm"
              className="w"
              onClick={() => handleSubmit('PUBLISHED')}
              disabled={!content.trim() || isLoading}
            >
              Post
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={cn(
                  "w-full resize-none bg-transparent text-lg outline-none",
                  "min-h-[60px] max-h-[300px] overflow-y-auto",
                  "placeholder:text-muted-foreground"
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                  <VideoIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                  <MusicIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                  <BarChart2Icon className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full border border-muted-foreground/20 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    {1000 - content.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 