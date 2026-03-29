import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, SafeAreaView, StatusBar, Dimensions, ScrollView } from 'react-native';
import Svg, { Polygon, Path, Circle, Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// --- SVG COMPONENTS --- //

const NeonSword = ({ color = '#39FF14', scale = 1 }) => (
  <View style={{ transform: [{ scale }] }}>
    <Svg viewBox="0 0 100 300" width={100} height={240}>
      <Polygon points="50,10 65,40 60,200 40,200 35,40" fill={color} />
      <Polygon points="50,20 55,45 52,195 48,195 45,45" fill="#FFFFFF" fillOpacity="0.5" />
      <Polygon points="20,200 80,200 85,210 75,220 25,220 15,210" fill="#2A2E35" stroke={color} strokeWidth="3" />
      <Path d="M30,210 L70,210" fill="none" stroke={color} strokeWidth="1.5" />
      <Polygon points="40,220 60,220 57,270 43,270" fill="#2A2E35" stroke={color} strokeWidth="2" />
      <Path d="M42,230 L58,230 M42,240 L58,240 M43,250 L57,250 M44,260 L56,260" fill="none" stroke={color} strokeWidth="2" />
      <Polygon points="35,270 65,270 60,285 40,285" fill={color} />
      <Circle cx="50" cy="277" r="2" fill="#2A2E35" />
      <Polygon points="25,40 30,35 30,60 25,65" fill={color} />
      <Polygon points="75,40 70,35 70,60 75,65" fill={color} />
      <Polygon points="30,80 33,75 33,120 30,125" fill={color} fillOpacity="0.5" />
      <Polygon points="70,80 67,75 67,120 70,125" fill={color} fillOpacity="0.5" />
    </Svg>
  </View>
);

const VoidBlade = ({ color = '#B539FF', scale = 1 }) => (
  <View style={{ transform: [{ scale }] }}>
    <Svg viewBox="0 0 100 300" width={100} height={240}>
      <Polygon points="30,20 70,20 80,180 50,220 20,180" fill={color} />
      <Polygon points="40,30 60,30 65,175 50,210 35,175" fill="#FFF" fillOpacity="0.4" />
      <Polygon points="10,210 90,210 80,230 20,230" fill="#2A2E35" stroke={color} strokeWidth="3" />
      <Polygon points="40,230 60,230 55,270 45,270" fill="#2A2E35" stroke={color} strokeWidth="2" />
      <Circle cx="50" cy="275" r="5" fill={color} />
      <Path d="M40,70 L60,80 M40,110 L60,120" fill="none" stroke="#2A2E35" strokeWidth="4" />
    </Svg>
  </View>
);

const CyberShield = ({ color = '#42E6F5', scale = 1 }) => (
  <View style={{ transform: [{ scale }] }}>
    <Svg viewBox="0 0 200 200" width={140} height={140}>
      <Polygon points="100,20 180,60 180,140 100,180 20,140 20,60" fill="none" stroke={color} strokeWidth="6" />
      <Polygon points="100,40 160,70 160,130 100,160 40,130 40,70" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
      <Circle cx="100" cy="100" r="20" fill="#FFF" fillOpacity="0.8" />
      <Path d="M100,20 L100,180 M20,60 L180,140 M20,140 L180,60" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.6" />
    </Svg>
  </View>
);

const PlasmaWhip = ({ color = '#FF647C', scale = 1 }) => (
  <View style={{ transform: [{ scale }] }}>
    <Svg viewBox="0 0 200 300" width={140} height={220}>
      <Path d="M50,250 C 40,200 120,180 150,150 C 180,120 130,80 100,50 C 70,20 180,10 160,5" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <Path d="M50,250 C 40,200 120,180 150,150 C 180,120 130,80 100,50 C 70,20 180,10 160,5" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
      <Rect x="40" y="250" width="20" height="40" fill="#2A2E35" stroke={color} strokeWidth="3" />
      <Circle cx="50" cy="290" r="5" fill={color} />
      <Circle cx="160" cy="5" r="4" fill="#FFF" />
    </Svg>
  </View>
);


// --- GLOBAL WEAPON DICTIONARY --- //

const WEAPON_DB = {
  neon_katana: { id: 'neon_katana', name: 'NEON KATANA', powerXp: 1.0, powerGold: 1.0, color: '#39FF14', Cmp: NeonSword },
  void_blade: { id: 'void_blade', name: 'VOID BLADE', price: 200, icon: '🗡️', color: '#B539FF', powerXp: 1.5, powerGold: 1.0, Cmp: VoidBlade },
  cyber_shield: { id: 'cyber_shield', name: 'CYBER SHIELD', price: 150, icon: '🛡️', color: '#42E6F5', powerXp: 1.0, powerGold: 2.0, Cmp: CyberShield },
  plasma_whip: { id: 'plasma_whip', name: 'PLASMA WHIP', price: 300, icon: '⚡', color: '#FF647C', powerXp: 2.0, powerGold: 1.5, Cmp: PlasmaWhip },
};

const SHOP_ITEMS = Object.values(WEAPON_DB).filter(w => w.price);


// --- APP ENTRY --- //

export default function App() {
  const [currentTab, setCurrentTab] = useState('BATTLE');

  // Battle State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Persistent Stats & Economy
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [hp, setHp] = useState(88);
  const [mp, setMp] = useState(42);
  const [battlesWon, setBattlesWon] = useState(0);
  const [gold, setGold] = useState(500); 
  const [inventory, setInventory] = useState(['neon_katana']);
  const [equipped, setEquipped] = useState('neon_katana');

  // Overlay State
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState('conquered'); 
  const [shopMessage, setShopMessage] = useState(null);
  const [lastRewards, setLastRewards] = useState({ xp: 0, gold: 0 });

  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Load Data
  useEffect(() => {
    const loadStats = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem('@level');
        const savedXp = await AsyncStorage.getItem('@xp');
        const savedHp = await AsyncStorage.getItem('@hp');
        const savedMp = await AsyncStorage.getItem('@mp');
        const savedBattles = await AsyncStorage.getItem('@battlesWon');
        const savedGold = await AsyncStorage.getItem('@gold');
        const savedInv = await AsyncStorage.getItem('@inventory');
        const savedEquiped = await AsyncStorage.getItem('@equipped');
        
        if (savedLevel !== null) setLevel(parseInt(savedLevel));
        if (savedXp !== null) setXp(parseInt(savedXp));
        if (savedHp !== null) setHp(parseInt(savedHp));
        if (savedMp !== null) setMp(parseInt(savedMp));
        if (savedBattles !== null) setBattlesWon(parseInt(savedBattles));
        if (savedGold !== null) setGold(parseInt(savedGold));
        if (savedInv !== null) setInventory(JSON.parse(savedInv));
        if (savedEquiped !== null) setEquipped(savedEquiped);

      } catch (e) {
        console.warn('Failed to load storage', e);
      }
    };
    loadStats();
  }, []);

  // Save Data
  const saveStatsAsync = async (nLevel, nXp, nHp, nMp, nBattles, nGold, nInv, nEquipped) => {
    try {
      await AsyncStorage.setItem('@level', nLevel.toString());
      await AsyncStorage.setItem('@xp', nXp.toString());
      await AsyncStorage.setItem('@hp', nHp.toString());
      await AsyncStorage.setItem('@mp', nMp.toString());
      await AsyncStorage.setItem('@battlesWon', nBattles.toString());
      await AsyncStorage.setItem('@gold', nGold.toString());
      await AsyncStorage.setItem('@inventory', JSON.stringify(nInv));
      await AsyncStorage.setItem('@equipped', nEquipped);
    } catch (e) {
      console.warn('Failed to save to storage', e);
    }
  };

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Heartbeat Anim
  useEffect(() => {
    const startPulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.05, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    };

    if (isActive) {
      pulseAnim.setValue(1);
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 250, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        ])
      ).start();
    } else {
      startPulse(); 
    }
    return () => pulseAnim.stopAnimation();
  }, [isActive, pulseAnim]);

  // Win Condition
  const handleSessionComplete = () => {
    setIsActive(false);

    // Apply Multipliers
    const weaponData = WEAPON_DB[equipped];
    const earnedXp = Math.floor(10 * weaponData.powerXp);
    const earnedGold = Math.floor(50 * weaponData.powerGold);

    setLastRewards({ xp: earnedXp, gold: earnedGold });

    let newXp = xp + earnedXp;
    let newGold = gold + earnedGold;  
    let newLevel = level;
    let type = 'conquered';
    let newHp = hp;
    let newMp = mp;
    let newBattles = battlesWon + 1;

    if (newXp >= 100) {
      newLevel += 1;
      newXp = newXp - 100; // Wrap XP
      type = 'levelup';
      newHp = 100;
      newMp = 100;
    }

    setXp(newXp);
    setGold(newGold);
    setLevel(newLevel);
    setHp(newHp);
    setMp(newMp);
    setBattlesWon(newBattles);
    
    setOverlayType(type);
    setShowOverlay(true);

    saveStatsAsync(newLevel, newXp, newHp, newMp, newBattles, newGold, inventory, equipped);
  };

  // Purchase Engine
  const handlePurchase = (item) => {
    if (inventory.includes(item.id)) return;
    if (gold >= item.price) {
      const newGold = gold - item.price;
      const newInv = [...inventory, item.id];
      setGold(newGold);
      setInventory(newInv);
      saveStatsAsync(level, xp, hp, mp, battlesWon, newGold, newInv, equipped);
      
      setShopMessage(`🌟 CHA-CHING! ${item.name} ACQUIRED!`);
      setTimeout(() => setShopMessage(null), 2500);
    } else {
      setShopMessage('⚠️ INSUFFICIENT FUNDS!');
      setTimeout(() => setShopMessage(null), 2500);
    }
  };

  const equipWeapon = (id) => {
    setEquipped(id);
    saveStatsAsync(level, xp, hp, mp, battlesWon, gold, inventory, id);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const skipTimerForDev = () => { setTimeLeft(1); setIsActive(true); };
  const resetAfterVictory = () => { setShowOverlay(false); setTimeLeft(25 * 60); };

  // ----- MODULAR RENDERS -----

  const renderBattleScreen = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const ActiveWeaponSVG = WEAPON_DB[equipped].Cmp;
    const activeColor = WEAPON_DB[equipped].color;

    return (
      <View style={styles.mainContent}>
        <View style={styles.dragonContainer}>
          <Animated.View style={[styles.dragonWrapper, { transform: [{ scale: pulseAnim }] }]}>
            {/* Dynamic Rendering based on Equipped State */}
            <ActiveWeaponSVG color={activeColor} />
          </Animated.View>
        </View>

        <View style={styles.bannerContainer}>
          <View style={[styles.bannerLeftDrop, { backgroundColor: activeColor }]} />
          <Text style={[styles.bannerText, { color: activeColor }]}>{WEAPON_DB[equipped].name} ENGAGED</Text>
          <View style={[styles.bannerRightDrop, { backgroundColor: activeColor }]} />
        </View>

        <View style={styles.timerBox}>
          <View style={[styles.cornerSquare, styles.topLeft]} />
          <View style={[styles.cornerSquare, styles.topRight]} />
          <View style={[styles.cornerSquare, styles.bottomLeft]} />
          <View style={[styles.cornerSquare, styles.bottomRight]} />
          
          <Text style={styles.chronoText}>C H R O N O - L I N K</Text>
          <Text style={styles.chronoText}>S Y N C H R O N I Z E D</Text>
          <Text style={styles.timerText}>{formattedTime}</Text>
        </View>

        <TouchableOpacity style={styles.startBtnContainer} onPress={toggleTimer} activeOpacity={0.8}>
          <View style={styles.startBtnBg} />
          <View style={styles.startBtnFront}>
            <Text style={styles.startBtnTitle}>{isActive ? 'PAUSE BATTLE' : 'START FOCUS BATTLE'}</Text>
            <Text style={styles.startBtnSubtitle}>P R E P A R E  F O R  D E E P  W O R K</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderStatsScreen = () => {
    const totalMinutes = battlesWon * 25;
    const xpPercent = Math.min(100, (xp / 100) * 100);

    return (
      <View style={styles.statsTabContent}>
        <Text style={styles.sectionHeader}>COMBAT ANALYTICS</Text>
        <View style={styles.dividerBright} />

        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsLabel}>TOTAL BATTLES WON</Text>
          <Text style={styles.analyticsBigNumber}>{battlesWon}</Text>
        </View>

        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsLabel}>TOTAL FOCUS MINUTES</Text>
          <Text style={[styles.analyticsBigNumber, { color: '#42E6F5' }]}>{totalMinutes}</Text>
        </View>

        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsLabel}>CURRENT LEVEL</Text>
          <Text style={[styles.analyticsBigNumber, { color: '#FF647C' }]}>{level}</Text>
          
          <View style={styles.xpBarContainer}>
            <Text style={styles.xpText}>{xp} / 100 XP</Text>
            <View style={styles.xpBarBg}>
              <View style={[styles.xpBarFill, { width: `${xpPercent}%` }]} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderShopScreen = () => {
    return (
      <View style={styles.shopTabContent}>
        <View style={styles.walletHeader}>
           <Text style={styles.walletLabel}>AVAILABLE FUNDS</Text>
           <Text style={styles.walletBalance}>{gold} GOLD</Text>
        </View>
        <View style={styles.dividerBright} />

        <Text style={styles.sectionHeader}>NEXUS MARKET</Text>

        {shopMessage && (
          <View style={styles.shopMessagePrompt}>
            <Text style={[styles.shopMessageText, shopMessage.includes('INSUFFICIENT') && { color: '#FF647C' }]}>
              {shopMessage}
            </Text>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.shopList}>
          {SHOP_ITEMS.map((item) => {
            const isOwned = inventory.includes(item.id);
            const canAfford = gold >= item.price;
            return (
              <View key={item.id} style={styles.shopCard}>
                <View style={styles.shopCardLeft}>
                   <View style={[styles.shopItemIconBox, { borderColor: item.color }]}>
                     <Text style={styles.shopItemEmoji}>{item.icon}</Text>
                   </View>
                   <View style={styles.shopItemInfo}>
                     <Text style={[styles.shopItemName, { color: item.color }]}>{item.name}</Text>
                     <Text style={styles.shopItemPrice}>{item.price} GOLD</Text>
                     <Text style={styles.shopItemStats}>PWR: x{item.powerXp} XP | x{item.powerGold} GOLD</Text>
                   </View>
                </View>
                
                <TouchableOpacity 
                   style={[
                     styles.buyBtn, 
                     isOwned ? styles.buyBtnOwned : (canAfford ? styles.buyBtnAfford : styles.buyBtnBroke)
                   ]}
                   onPress={() => handlePurchase(item)}
                   disabled={isOwned}
                >
                  <Text style={[
                     styles.buyBtnText,
                     isOwned ? styles.buyBtnTextOwned : styles.buyBtnTextActive
                  ]}>
                    {isOwned ? 'OWNED' : 'BUY'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderGearScreen = () => {
    const totalOwned = inventory.length; 
    const lockedCount = Math.max(0, 6 - totalOwned);

    return (
      <View style={styles.gearTabContent}>
        <Text style={styles.sectionHeader}>ARMORY</Text>
        <View style={styles.dividerBright} />
        
        <ScrollView contentContainerStyle={styles.gearGrid}>
          {/* DYNAMIC OWNED SLOTS */}
          {inventory.map(id => {
            const item = WEAPON_DB[id];
            const isEquipped = equipped === id;
            const ActSVG = item.Cmp;
            
            return (
               <TouchableOpacity 
                 key={id} 
                 activeOpacity={0.8}
                 onPress={() => equipWeapon(id)}
                 style={[
                   styles.gearSlot, 
                   styles.gearSlotOwned, 
                   { borderColor: isEquipped ? item.color : '#2E333C' },
                   isEquipped && { backgroundColor: '#1A2328', shadowColor: item.color, elevation: 5 }
                 ]}
               >
                 <Text style={[styles.equippedBadge, { color: isEquipped ? item.color : '#8A94A6' }]}>
                   {isEquipped ? '[ EQUIPPED ]' : '[ OWNED ]'}
                 </Text>
                 <View style={styles.gearIconWrapper}>
                    <ActSVG color={isEquipped ? item.color : '#8A94A6'} scale={0.4} />
                 </View>
                 <Text style={[styles.gearName, { color: '#FFF' }]}>{item.name}</Text>
                 <Text style={styles.gearMultiplier}>PWR: XP x{item.powerXp} | GLD x{item.powerGold}</Text>
               </TouchableOpacity>
            );
          })}

          {/* LOCKED SLOTS */}
          {Array(lockedCount).fill(0).map((_, idx) => (
            <View key={`locked-${idx}`} style={styles.gearSlot}>
              <Text style={styles.lockedIcon}>🔒</Text>
              <Text style={styles.gearNameLocked}>LOCKED SLOT</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  // ----- MAIN VIEW -----

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2A2E35" />
      
      {/* Universal Header */}
      <View style={styles.topBar}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={skipTimerForDev} activeOpacity={0.8} style={styles.avatarBox}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.username}>NEON_CHROMA</Text>
            <Text style={styles.levelText}>LVL {level} | XP: {xp}/100</Text>
          </View>
        </View>
        <View style={styles.goldPill}>
           <Text style={styles.goldPillText}>{gold} GOLD</Text>
        </View>
      </View>
      <View style={styles.divider} />

      {/* Universal Progress Bars */}
      <View style={styles.statsSection}>
        <View style={styles.statContainer}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, {color: '#FF647C'}]}>HP / STAMINA</Text>
            <Text style={[styles.statValue, {color: '#FF647C'}]}>{hp}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {backgroundColor: '#FF647C', width: `${hp}%`}]} />
          </View>
        </View>
        
        <View style={styles.statContainer}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, {color: '#42E6F5'}]}>MP / FOCUS</Text>
            <Text style={[styles.statValue, {color: '#42E6F5'}]}>{mp}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {backgroundColor: '#42E6F5', width: `${mp}%`}]} />
          </View>
        </View>
      </View>

      {/* Render Active Tab */}
      <View style={styles.tabContainer}>
        {currentTab === 'BATTLE' && renderBattleScreen()}
        {currentTab === 'STATS' && renderStatsScreen()}
        {currentTab === 'GEAR' && renderGearScreen()}
        {currentTab === 'SHOP' && renderShopScreen()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, currentTab === 'BATTLE' && styles.navItemActive]} onPress={() => setCurrentTab('BATTLE')}>
          <Text style={[styles.navIcon, currentTab === 'BATTLE' && {color: '#39FF14'}]}>⚔️</Text>
          <Text style={[styles.navText, currentTab === 'BATTLE' && {color: '#39FF14'}]}>BATTLE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, currentTab === 'STATS' && styles.navItemActive]} onPress={() => setCurrentTab('STATS')}>
          <Text style={[styles.navIcon, currentTab === 'STATS' && {color: '#39FF14'}]}>📊</Text>
          <Text style={[styles.navText, currentTab === 'STATS' && {color: '#39FF14'}]}>STATS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, currentTab === 'SHOP' && styles.navItemActive]} onPress={() => setCurrentTab('SHOP')}>
          <Text style={[styles.navIcon, currentTab === 'SHOP' && {color: '#F9E154'}]}>🏪</Text>
          <Text style={[styles.navText, currentTab === 'SHOP' && {color: '#F9E154'}]}>SHOP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, currentTab === 'GEAR' && styles.navItemActive]} onPress={() => setCurrentTab('GEAR')}>
          <Text style={[styles.navIcon, currentTab === 'GEAR' && {color: '#39FF14'}]}>⚙️</Text>
          <Text style={[styles.navText, currentTab === 'GEAR' && {color: '#39FF14'}]}>GEAR</Text>
        </TouchableOpacity>
      </View>

      {/* Victory Overlay */}
      {showOverlay && (
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            <Text style={[styles.overlayTitle, overlayType === 'levelup' && { color: '#F9E154' }]}>
              {overlayType === 'levelup' ? 'LEVEL UP!' : 'CONQUERED'}
            </Text>
            
            <View style={styles.rewardBox}>
              <Text style={styles.rewardText}>+{lastRewards.xp} XP EARNED</Text>
              <Text style={[styles.rewardText, { color: '#F9E154', marginTop: 10 }]}>+{lastRewards.gold} GOLD EARNED</Text>
              {overlayType === 'levelup' && <Text style={styles.levelUpText}>HP & MP RESTORED</Text>}
            </View>

            <TouchableOpacity style={styles.dismissBtn} onPress={resetAfterVictory}>
              <Text style={styles.dismissBtnText}>ONWARD</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // General & Header Styles
  container: { flex: 1, backgroundColor: '#2A2E35' },
  tabContainer: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  avatarBox: { width: 38, height: 38, backgroundColor: '#1C2025', borderWidth: 1.5, borderColor: '#39FF14', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  avatarEmoji: { fontSize: 22 },
  username: { fontSize: 18, fontWeight: '800', color: '#39FF14', letterSpacing: 2 },
  levelText: { fontSize: 10, color: '#8A94A6', fontWeight: '700', letterSpacing: 1, marginTop: 2 },
  goldPill: { backgroundColor: '#1E2227', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: '#F9E154' },
  goldPillText: { color: '#F9E154', fontSize: 12, fontWeight: 'bold' },
  divider: { height: 4, backgroundColor: '#1C2025', width: '100%' },
  statsSection: { paddingHorizontal: 20, paddingVertical: 15, gap: 12 },
  statContainer: { width: '100%' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  statLabel: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'uppercase' },
  statValue: { fontSize: 11, fontWeight: '900' },
  progressBarBg: { height: 12, backgroundColor: '#1A1C20', width: '100%' },
  progressBarFill: { height: '100%' },

  // Battle Screen Styles
  mainContent: { flex: 1, alignItems: 'center', paddingHorizontal: 20 },
  dragonContainer: { alignItems: 'center', justifyContent: 'center', height: 240, marginTop: 10 },
  dragonWrapper: { zIndex: 2 },
  bannerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: -10, marginBottom: 20 },
  bannerLeftDrop: { width: 4, height: 20, marginRight: 6 },
  bannerRightDrop: { width: 4, height: 20, marginLeft: 6 },
  bannerText: { fontSize: 12, fontWeight: '900', fontStyle: 'italic', letterSpacing: 3 },
  timerBox: { width: '100%', backgroundColor: '#20242A', paddingVertical: 20, alignItems: 'center', position: 'relative', marginTop: 15, marginBottom: 20, borderWidth: 1, borderColor: '#111' },
  cornerSquare: { position: 'absolute', width: 6, height: 6, backgroundColor: '#39FF14' },
  topLeft: { top: -2, left: -2 }, topRight: { top: -2, right: -2 }, bottomLeft: { bottom: -2, left: -2 }, bottomRight: { bottom: -2, right: -2 },
  chronoText: { color: '#8A94A6', fontSize: 10, letterSpacing: 4, marginBottom: 2 },
  timerText: { fontSize: 70, fontWeight: '900', color: '#39FF14', fontVariant: ['tabular-nums'], textShadowColor: 'rgba(57, 255, 20, 0.4)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20, marginTop: 5 },
  startBtnContainer: { width: '100%', position: 'relative', marginTop: 10 },
  startBtnBg: { position: 'absolute', top: 6, left: 6, right: -6, bottom: -6, backgroundColor: '#39FF14', opacity: 0.5 },
  startBtnFront: { backgroundColor: '#2A2E35', borderWidth: 2, borderColor: '#39FF14', paddingVertical: 18, alignItems: 'center' },
  startBtnTitle: { color: '#39FF14', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  startBtnSubtitle: { color: '#8A94A6', fontSize: 9, letterSpacing: 3, marginTop: 4 },

  // Stats Screen Styles
  statsTabContent: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  sectionHeader: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', letterSpacing: 4, marginBottom: 4, textAlign: 'center' },
  dividerBright: { height: 2, backgroundColor: '#39FF14', width: '100%', marginBottom: 20 },
  analyticsCard: { backgroundColor: '#1E2227', borderWidth: 1, borderColor: '#2E333C', padding: 20, marginBottom: 15, alignItems: 'center' },
  analyticsLabel: { color: '#8A94A6', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 10 },
  analyticsBigNumber: { color: '#39FF14', fontSize: 48, fontWeight: '900', fontVariant: ['tabular-nums'] },
  xpBarContainer: { width: '100%', marginTop: 15, alignItems: 'center' },
  xpText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  xpBarBg: { width: '100%', height: 16, backgroundColor: '#111', borderWidth: 1, borderColor: '#FF647C' },
  xpBarFill: { height: '100%', backgroundColor: '#FF647C' },

  // Shop Screen Styles
  shopTabContent: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  walletHeader: { alignItems: 'center', marginBottom: 15 },
  walletLabel: { color: '#8A94A6', fontSize: 11, fontWeight: 'bold', letterSpacing: 2 },
  walletBalance: { color: '#F9E154', fontSize: 36, fontWeight: '900', fontVariant: ['tabular-nums'] },
  shopMessagePrompt: { backgroundColor: '#1A2F20', padding: 10, borderWidth: 1, borderColor: '#39FF14', marginBottom: 15, alignItems: 'center' },
  shopMessageText: { color: '#39FF14', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  shopList: { paddingBottom: 20 },
  shopCard: { flexDirection: 'row', backgroundColor: '#1E2227', borderWidth: 1, borderColor: '#2E333C', padding: 15, marginBottom: 15, alignItems: 'center', justifyContent: 'space-between' },
  shopCardLeft: { flexDirection: 'row', alignItems: 'center' },
  shopItemIconBox: { width: 50, height: 50, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' },
  shopItemEmoji: { fontSize: 24 },
  shopItemInfo: { marginLeft: 15 },
  shopItemName: { fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  shopItemPrice: { color: '#F9E154', fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  shopItemStats: { color: '#8A94A6', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },
  buyBtn: { paddingVertical: 10, paddingHorizontal: 15, borderWidth: 2, borderRadius: 0 },
  buyBtnAfford: { backgroundColor: '#1A2F20', borderColor: '#39FF14' },
  buyBtnBroke: { backgroundColor: '#2E333C', borderColor: '#6A7486' },
  buyBtnOwned: { backgroundColor: '#111', borderColor: '#333' },
  buyBtnText: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  buyBtnTextActive: { color: '#FFF' },
  buyBtnTextOwned: { color: '#666' },

  // Gear Screen Styles
  gearTabContent: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  gearGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 20 },
  gearSlot: { width: '48%', aspectRatio: 1, backgroundColor: '#1E2227', borderWidth: 2, borderColor: '#2E333C', marginBottom: 15, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  gearSlotOwned: { backgroundColor: '#1A1C20' },
  equippedBadge: { position: 'absolute', top: 10, fontSize: 9, fontWeight: '900', letterSpacing: 1, zIndex: 10 },
  gearIconWrapper: { alignItems: 'center', justifyContent: 'center', height: 90 },
  gearName: { position: 'absolute', bottom: 20, color: '#FFFFFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  gearMultiplier: { position: 'absolute', bottom: 6, color: '#8A94A6', fontSize: 8, fontWeight: 'bold', letterSpacing: 1 },
  lockedIcon: { fontSize: 32, opacity: 0.5 },
  gearNameLocked: { position: 'absolute', bottom: 10, color: '#6A7486', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },

  // Bottom Navigation
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#22252B', paddingVertical: 15, borderTopWidth: 2, borderColor: '#1C2025' },
  navItem: { alignItems: 'center', flex: 1 },
  navItemActive: { borderTopWidth: 2, borderColor: '#39FF14', marginTop: -17, paddingTop: 15 },
  navIcon: { fontSize: 20, color: '#6A7486', marginBottom: 4 },
  navText: { fontSize: 10, fontWeight: 'bold', color: '#6A7486', letterSpacing: 1 },
  
  // Overlay Styles
  overlayContainer: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(28, 32, 37, 0.95)', zIndex: 100, alignItems: 'center', justifyContent: 'center', padding: 20 },
  overlayContent: { width: '100%', backgroundColor: '#2A2E35', borderWidth: 2, borderColor: '#39FF14', padding: 40, alignItems: 'center', shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 30, elevation: 20 },
  overlayTitle: { fontSize: 32, fontWeight: '900', color: '#39FF14', letterSpacing: 4, marginBottom: 20, textAlign: 'center' },
  rewardBox: { backgroundColor: '#1E2227', padding: 15, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#333', marginBottom: 30 },
  rewardText: { color: '#ECECEC', fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  levelUpText: { color: '#F9E154', fontSize: 12, fontWeight: 'bold', marginTop: 10, letterSpacing: 1 },
  dismissBtn: { backgroundColor: '#39FF14', paddingVertical: 15, paddingHorizontal: 40 },
  dismissBtnText: { color: '#2A2E35', fontSize: 16, fontWeight: '900', letterSpacing: 3 },
});
