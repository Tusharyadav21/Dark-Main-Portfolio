"use client";

import { PartyPopper } from 'lucide-react';
import React from 'react';

const MarqueeText = () => {
  return (
    <>
      <div className="marquee-text">
        <div className="marquee-text-track">
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p><PartyPopper height={124} width={124} /></p>
          <p aria-hidden="true" ><PartyPopper height={124} width={124} /></p>
        </div>
      </div>
      <style jsx>{`
        .marquee-text {
          // overflow: clip;
        }
        
        .marquee-text-track {
          display: flex;
          padding-left: 1rem;
          gap: 5rem;
          width: max-content;
          animation: marquee-move-text var(--speed, 16s) linear infinite var(--direction, forwards);
        }
        
        .marquee-text p {
        //   border: 1px solid white;
        //   background-color: #141414;
        //   border-radius: 999px;
        font-size: 3rem;
          padding: 1rem 1rem;
        }
        
        @keyframes marquee-move-text {
          to {
            transform: translateX(-85%);
          }
        }
      `}</style>
    </>
  );
};

export default MarqueeText;
