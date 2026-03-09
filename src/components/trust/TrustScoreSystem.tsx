import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Star, 
  Zap, 
  Lock, 
  Gift, 
  Award,
  ChevronDown,
  Flame,
  Crown,
  Diamond,
  Sparkles,
  Wallet,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface TrustBadge {
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  score: number
  multiplier: number
  color: string
  icon: React.ElementType
  benefits: string[]
}

const trustLevels: TrustBadge[] = [
  { 
    level: 'bronze', 
    score: 0, 
    multiplier: 1.1,
    color: 'from-amber-700 to-amber-900',
    icon: Star,
    benefits: ['5% fee discount', 'Basic alerts']
  },
  { 
    level: 'silver', 
    score: 50, 
    multiplier: 1.25,
    color: 'from-gray-400 to-gray-600',
    icon: Shield,
    benefits: ['10% fee discount', 'Priority support', 'Early access']
  },
  { 
    level: 'gold', 
    score: 75, 
    multiplier: 1.5,
    color: 'from-yellow-400 to-yellow-600',
    icon: Crown,
    benefits: ['20% fee discount', 'Priority airdrops', 'Governance votes']
  },
  { 
    level: 'platinum', 
    score: 90, 
    multiplier: 2,
    color: 'from-purple-400 to-purple-700',
    icon: Diamond,
    benefits: ['30% fee discount', 'Exclusive events', 'VIP support']
  },
  { 
    level: 'diamond', 
    score: 98, 
    multiplier: 3,
    color: 'from-cyan-400 to-blue-600',
    icon: Sparkles,
    benefits: ['50% fee discount', 'All perks', 'DAO governance power']
  },
]

const userProgress = {
  currentScore: 72,
  bridgeCount: 47,
  volume: '$125,400',
  tokensHeld: 12,
  airdropsReceived: 8,
  nextTier: 'gold',
  progressToNext: 68
}

const recentBadges = [
  { name: 'Early Adopter', earned: '2024-01-15', icon: '🚀' },
  { name: 'Volume Master', earned: '2024-02-20', icon: '📈' },
  { name: 'Cross-Chain Pro', earned: '2024-03-10', icon: '🌉' },
]

export function TrustScoreSystem() {
  const [selectedTier, setSelectedTier] = useState<TrustBadge>(trustLevels[2])

  const getCurrentTier = (score: number) => {
    return trustLevels.slice().reverse().find(t => score >= t.score) || trustLevels[0]
  }

  const currentTier = getCurrentTier(userProgress.currentScore)
  const nextTier = trustLevels[trustLevels.indexOf(currentTier) + 1]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">Trust Score NFT</h1>
          <p className="text-muted-foreground mt-1">Your bridge reputation & AI-verified identity</p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Soulbound NFT
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trust Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Trust Score */}
          <Card className="overflow-hidden">
            <div className={cn(
              "h-32 bg-gradient-to-r",
              currentTier.color
            )} />
            <CardContent className="-mt-16 pb-6">
              <div className="flex items-end gap-6">
                {/* NFT Badge */}
                <motion.div 
                  className={cn(
                    "w-32 h-32 rounded-2xl flex items-center justify-center shadow-elevated",
                    "bg-gradient-to-br",
                    currentTier.color
                  )}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <currentTier.icon className="w-16 h-16 text-white" />
                </motion.div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-display font-bold">Trust Score</h2>
                      <Badge className={cn("gap-1", currentTier.color)}>
                        <currentTier.icon className="w-3 h-3" />
                        {currentTier.level.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-display font-bold gradient-text">
                        {userProgress.currentScore}
                      </span>
                      <span className="text-muted-foreground">/ 100</span>
                    </div>
                  </div>

                  {/* Progress to next tier */}
                  {nextTier && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress to {nextTier.level}</span>
                        <span className="font-mono">{userProgress.progressToNext}%</span>
                      </div>
                      <Progress value={userProgress.progressToNext} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-warning" />
                <p className="text-2xl font-display font-bold">{userProgress.bridgeCount}</p>
                <p className="text-xs text-muted-foreground">Bridges Made</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Flame className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-display font-bold">{userProgress.volume}</p>
                <p className="text-xs text-muted-foreground">Volume</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-display font-bold">{userProgress.tokensHeld}</p>
                <p className="text-xs text-muted-foreground">Tokens Held</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Gift className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="text-2xl font-display font-bold">{userProgress.airdropsReceived}</p>
                <p className="text-xs text-muted-foreground">Airdrops</p>
              </CardContent>
            </Card>
          </div>

          {/* Tier Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Tier Benefits</CardTitle>
              <CardDescription>Unlock more perks as your Trust Score grows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {trustLevels.map((tier) => (
                  <button
                    key={tier.level}
                    onClick={() => setSelectedTier(tier)}
                    className={cn(
                      "p-4 rounded-lg border transition-all text-center",
                      selectedTier.level === tier.level
                        ? "bg-primary/10 border-primary/50"
                        : "bg-muted/30 border-border hover:border-primary/30"
                    )}
                  >
                    <tier.icon className={cn(
                      "w-8 h-8 mx-auto mb-2",
                      tier.level === currentTier.level ? "text-primary" : "text-muted-foreground"
                    )} />
                    <div className="font-bold text-sm capitalize">{tier.level}</div>
                    <div className="text-xs text-muted-foreground">{tier.multiplier}x</div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <div className="font-medium mb-2">Current Benefits</div>
                <ul className="space-y-2">
                  {currentTier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Mint NFT */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
            <CardContent className="pt-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-purple">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Mint Your Trust NFT</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bridge tokens to mint your soulbound Trust Score NFT. Higher scores = better rewards.
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                <Wallet className="w-4 h-4 mr-2" />
                Mint NFT (0.01 SOL)
              </Button>
            </CardContent>
          </Card>

          {/* Recent Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Earned Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">Earned {badge.earned}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* How to Increase Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Boost Your Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bridge more tokens</span>
                <Badge variant="outline">+5 pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Hold bridged assets</span>
                <Badge variant="outline">+2 pts/day</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Use verified tokens</span>
                <Badge variant="outline">+10 pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Refer friends</span>
                <Badge variant="outline">+15 pts</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
