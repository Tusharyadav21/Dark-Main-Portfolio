"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ children, className, onClick }) => {
    return (
        <motion.button className={`${className} cursor-pointer`} onClick={onClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >
            {children}
        </motion.button>
    )
}

export default Button