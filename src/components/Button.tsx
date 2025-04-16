import { cva } from "class-variance-authority"


const buttonStyles = cva(["hover:bg-secondary-hover", "transition-colors"], {
    variants: {
        size: {
            default: ["rounded", "p-2"],
            icon: ["rounded-full", "w-10", "h-10", "flex", "items-center", "justify-center", "p-2.5"],

        }
    }
})

const classes = buttonStyles({size: "icon"})

export function Button() {
    return <button/>
}