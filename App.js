import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, Easing, SafeAreaView, StatusBar, Dimensions, ScrollView, Platform, Modal } from 'react-native';
import Svg, { Polygon, Path, Circle, Rect, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

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

// Geometric Cyber Hydra
const CyberHydra = ({ scale = 1 }) => (
  <View style={{ transform: [{ scale }] }}>
    <Svg viewBox="0 0 300 200" width={220} height={140}>
      <Defs>
        <LinearGradient id="hydraGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#B539FF" stopOpacity="1" />
          <Stop offset="1" stopColor="#00E5FF" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Necks uniting */}
      <Path d="M150,90 L150,160 M80,110 L130,160 M220,110 L170,160" fill="none" stroke="url(#hydraGrad)" strokeWidth="6" strokeLinecap="round" />
      <Path d="M150,90 L150,160 M80,110 L130,160 M220,110 L170,160" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Center Head */}
      <G transform="translate(150, 70)">
        <Polygon points="-25,-20 0,-60 25,-20 15,20 -15,20" fill="none" stroke="#00E5FF" strokeWidth="8" strokeOpacity="0.3" />
        <Polygon points="-20,-15 0,-50 20,-15 10,15 -10,15" fill="none" stroke="url(#hydraGrad)" strokeWidth="4" />
        <Polygon points="-20,-15 0,-50 20,-15 10,15 -10,15" fill="url(#hydraGrad)" fillOpacity="0.3" />
        <Polygon points="-10,-5 0,10 10,-5 0,-20" fill="url(#hydraGrad)" />
        <Circle cx="-10" cy="-25" r="4" fill="#FFF" />
        <Circle cx="10" cy="-25" r="4" fill="#FFF" />
        <Path d="M-8,15 L-4,35 M8,15 L4,35" stroke="#FFF" strokeWidth="2.5" />
      </G>

      {/* Left Head */}
      <G transform="translate(70, 95) rotate(-35)">
        <G transform="scale(0.8)">
          <Polygon points="-25,-20 0,-60 25,-20 15,20 -15,20" fill="none" stroke="#B539FF" strokeWidth="8" strokeOpacity="0.3" />
          <Polygon points="-20,-15 0,-50 20,-15 10,15 -10,15" fill="none" stroke="url(#hydraGrad)" strokeWidth="3" />
          <Polygon points="-20,-15 0,-50 20,-15 10,15 -10,15" fill="url(#hydraGrad)" fillOpacity="0.3" />
          <Polygon points="-10,-5 0,10 10,-5 0,-20" fill="url(#hydraGrad)" />
          <Circle cx="-10" cy="-25" r="3" fill="#FFF" />
          <Circle cx="10" cy="-25" r="3" fill="#FFF" />
          <Path d="M-8,15 L-4,30 M8,15 L4,30" stroke="#FFF" strokeWidth="2" />
        </G>
      </G>

      {/* Right Head */}
      <G transform="translate(230, 95) rotate(35)">
        <G transform="scale(0.8)">
          <Polygon points="-25,-20 0,-60 25,-20 15,20 -15,20" fill="none" stroke="#00E5FF" strokeWidth="8" strokeOpacity="0.3" />
          <Polygon points="-20,-15 0,-50 20,-15 10,15 -10,15" fill="none" stroke="url(#hydraGrad)" strokeWidth="3" />
          <Polygon points="-20,-15 0,-50 20,-15 10,15 -10,15" fill="url(#hydraGrad)" fillOpacity="0.3" />
          <Polygon points="-10,-5 0,10 10,-5 0,-20" fill="url(#hydraGrad)" />
          <Circle cx="-10" cy="-25" r="3" fill="#FFF" />
          <Circle cx="10" cy="-25" r="3" fill="#FFF" />
          <Path d="M-8,15 L-4,30 M8,15 L4,30" stroke="#FFF" strokeWidth="2" />
        </G>
      </G>
    </Svg>
  </View>
);

// --- MISSING GEAR --- //

const QuantumWings = ({ color = '#00E5FF', scale = 1 }) => (
  <View style={{ transform: [{ scale }] }}>
    <Svg viewBox="0 0 200 200" width={140} height={140}>
      <Path d="M100,20 C140,40 180,10 190,60 C200,110 150,150 100,180 C50,150 0,110 10,60 C20,10 60,40 100,20 Z" fill="none" stroke={color} strokeWidth="4" />
      <Path d="M100,50 L160,80 L100,150 L40,80 Z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="2" />
      <Circle cx="100" cy="100" r="15" fill="#FFF" />
      <Path d="M100,50 L100,150 M40,80 L160,80" stroke="#FFF" strokeWidth="2" />
    </Svg>
  </View>
);

const NovaCore = ({ color = '#FF007F', scale = 1 }) => (
  <View style={{ transform: [{ scale }] }}>
    <Svg viewBox="0 0 200 200" width={140} height={140}>
      <Circle cx="100" cy="100" r="60" fill="none" stroke={color} strokeWidth="8" />
      <Circle cx="100" cy="100" r="45" fill={color} fillOpacity="0.5" />
      <Circle cx="100" cy="100" r="25" fill="#FFF" />
      <Path d="M100,10 L100,40 M100,160 L100,190 M10,100 L40,100 M160,100 L190,100 M35,35 L55,55 M145,145 L165,165 M35,165 L55,145 M145,35 L165,55" stroke={color} strokeWidth="6" strokeLinecap="round" />
    </Svg>
  </View>
);

// --- AVATARS --- //

const DefaultAvatar = ({ color = '#39FF14', scale = 1 }) => (
  <Svg viewBox="0 0 100 100" width={34 * scale} height={34 * scale}>
    <Circle cx="50" cy="40" r="20" fill="none" stroke={color} strokeWidth="6" />
    <Path d="M20,90 C20,60 80,60 80,90" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
  </Svg>
);

const SamuraiAvatar = ({ color = '#FF3B30', scale = 1 }) => (
  <Svg viewBox="0 0 100 100" width={34 * scale} height={34 * scale}>
    <Polygon points="20,50 50,10 80,50" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="4" />
    <Path d="M20,50 L20,90 L50,80 L80,90 L80,50 Z" fill="none" stroke={color} strokeWidth="4" />
    <Rect x="35" y="60" width="30" height="10" fill="#FFF" />
    <Polygon points="50,10 40,-10 60,-10" fill={color} />
  </Svg>
);

const AndroidAvatar = ({ color = '#39FF14', scale = 1 }) => (
  <Svg viewBox="0 0 100 100" width={34 * scale} height={34 * scale}>
    <Rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke={color} strokeWidth="6" />
    <Line x1="10" y1="50" x2="20" y2="50" stroke={color} strokeWidth="6" />
    <Line x1="80" y1="50" x2="90" y2="50" stroke={color} strokeWidth="6" />
    <Circle cx="35" cy="40" r="6" fill="#FFF" />
    <Circle cx="65" cy="40" r="6" fill="#FFF" />
    <Line x1="30" y1="65" x2="70" y2="65" stroke="#FFF" strokeWidth="4" />
  </Svg>
);

const ShadowAvatar = ({ color = '#B539FF', scale = 1 }) => (
  <Svg viewBox="0 0 100 100" width={34 * scale} height={34 * scale}>
    <Path d="M50,10 C 20,10 10,40 10,60 L50,90 L90,60 C 90,40 80,10 50,10 Z" fill="none" stroke={color} strokeWidth="6" />
    <Polygon points="10,60 50,40 90,60 50,90" fill={color} fillOpacity="0.5" />
    <Circle cx="35" cy="45" r="4" fill="#FFF" />
    <Circle cx="65" cy="45" r="4" fill="#FFF" />
  </Svg>
);

// --- GLOBAL DICTIONARIES --- //

const AVATAR_DB = {
  default: { id: 'default', name: 'NEON CHROMA', color: '#39FF14', Cmp: DefaultAvatar },
  samurai: { id: 'samurai', name: 'CYBER SAMURAI', price: 1000, icon: '👹', color: '#FF3B30', Cmp: SamuraiAvatar },
  android: { id: 'android', name: 'VOID ANDROID', price: 2500, icon: '🤖', color: '#39FF14', Cmp: AndroidAvatar },
  shadow: { id: 'shadow', name: 'SHADOW ENTITY', price: 5000, icon: '🥷', color: '#B539FF', Cmp: ShadowAvatar },
};

const AVATAR_SHOP = Object.values(AVATAR_DB).filter(a => a.price);

const WEAPON_DB = {
  neon_katana: { id: 'neon_katana', name: 'NEON KATANA', powerXp: 1.0, powerGold: 1.0, powerDmg: 1.0, color: '#39FF14', Cmp: NeonSword },
  void_blade: { id: 'void_blade', name: 'VOID BLADE', price: 200, icon: '🗡️', color: '#B539FF', powerXp: 1.5, powerGold: 1.0, powerDmg: 1.5, Cmp: VoidBlade },
  cyber_shield: { id: 'cyber_shield', name: 'CYBER SHIELD', price: 150, icon: '🛡️', color: '#42E6F5', powerXp: 1.0, powerGold: 2.0, powerDmg: 1.0, Cmp: CyberShield },
  plasma_whip: { id: 'plasma_whip', name: 'PLASMA WHIP', price: 300, icon: '⚡', color: '#FF647C', powerXp: 2.5, powerGold: 1.5, powerDmg: 2.5, Cmp: PlasmaWhip },
  quantum_wings: { id: 'quantum_wings', name: 'QUANTUM WINGS', price: 1500, icon: '🦋', color: '#00E5FF', powerXp: 1.5, powerGold: 1.0, powerDmg: 1.0, Cmp: QuantumWings },
  nova_core: { id: 'nova_core', name: 'NOVA CORE', price: 4000, icon: '🔮', color: '#FF007F', powerXp: 0.5, powerGold: 1.0, powerDmg: 4.0, Cmp: NovaCore },
};

const SHOP_ITEMS = Object.values(WEAPON_DB).filter(w => w.price);

// --- DYNAMIC THEMING --- //

const getStyles = (theme) => {
  const isDark = theme === 'dark';
  const c = {
    bg: isDark ? '#2A2E35' : '#E8ECEF',
    card: isDark ? '#1E2227' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#11151C',
    subText: isDark ? '#8A94A6' : '#5A6476',
    border: isDark ? '#2E333C' : '#D0D8E0',
    navBg: isDark ? '#22252B' : '#F4F7F9',
    timerBg: isDark ? '#20242A' : '#FAFCFD',
    overlayBg: isDark ? 'rgba(28, 32, 37, 0.95)' : 'rgba(232, 236, 239, 0.95)',
    avatarBg: isDark ? '#1C2025' : '#FFFFFF',
    divider: isDark ? '#1C2025' : '#D0D8E0'
  };

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    tabContainer: { flex: 1 },
    topBar: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    profileSection: { flexDirection: 'row', alignItems: 'center' },
    avatarBox: { width: 38, height: 38, backgroundColor: c.avatarBg, borderWidth: 1.5, borderColor: '#39FF14', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    avatarEmoji: { fontSize: 22 },
    username: { fontSize: 18, fontWeight: '800', color: '#39FF14', letterSpacing: 2 },
    levelText: { fontSize: 10, color: c.subText, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
    goldPill: { backgroundColor: isDark ? '#1E2227' : '#FFF9D6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: '#F9E154' },
    goldPillText: { color: isDark ? '#F9E154' : '#E0C200', fontSize: 12, fontWeight: 'bold' },
    themeBtn: { width: 38, height: 38, backgroundColor: c.card, borderWidth: 1, borderColor: c.border, alignItems: 'center', justifyContent: 'center', borderRadius: 19 },
    divider: { height: 4, backgroundColor: c.divider, width: '100%' },
    
    statsSection: { paddingHorizontal: 20, paddingVertical: 15, gap: 12 },
    statContainer: { width: '100%' },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    statLabel: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'uppercase' },
    statValue: { fontSize: 11, fontWeight: '900' },
    progressBarBg: { height: 12, backgroundColor: isDark ? '#1A1C20' : '#D0D8E0', width: '100%' },
    progressBarFill: { height: '100%' },

    // Core Tabs
    tabContent: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
    sectionHeader: { fontSize: 16, fontWeight: '900', color: c.text, letterSpacing: 4, marginBottom: 4, textAlign: 'center' },
    dividerBright: { height: 2, backgroundColor: '#39FF14', width: '100%', marginBottom: 20 },

    // Battle Layout
    mainContent: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
    bossHpBar: { width: '100%', height: 10, backgroundColor: isDark ? '#111' : '#DDD', borderWidth: 1, borderColor: '#FF3B30', marginTop: 10, marginBottom: -10 },
    bossHpFill: { height: '100%', backgroundColor: '#FF3B30' },
    dragonContainer: { alignItems: 'center', justifyItems: 'center', height: 240, marginTop: 15 },
    dragonBackground: { position: 'absolute', opacity: 0.8 },
    dragonWrapper: { zIndex: 3 },
    bannerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: -5, marginBottom: 15 },
    bannerLeftDrop: { width: 4, height: 20, marginRight: 6 },
    bannerRightDrop: { width: 4, height: 20, marginLeft: 6 },
    bannerText: { fontSize: 12, fontWeight: '900', fontStyle: 'italic', letterSpacing: 3 },
    
    timerBox: { width: '100%', backgroundColor: c.timerBg, paddingVertical: 20, alignItems: 'center', position: 'relative', marginTop: 10, marginBottom: 20, borderWidth: 1, borderColor: c.border },
    cornerSquare: { position: 'absolute', width: 6, height: 6, backgroundColor: '#39FF14' },
    topLeft: { top: -2, left: -2 }, topRight: { top: -2, right: -2 }, bottomLeft: { bottom: -2, left: -2 }, bottomRight: { bottom: -2, right: -2 },
    chronoText: { color: c.subText, fontSize: 10, letterSpacing: 4, marginBottom: 2 },
    timerText: { fontSize: 70, fontWeight: '900', color: '#39FF14', fontVariant: ['tabular-nums'], textShadowColor: 'rgba(57, 255, 20, 0.4)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20, marginTop: 5 },
    
    startBtnContainer: { width: '100%', position: 'relative', marginTop: 10 },
    startBtnBg: { position: 'absolute', top: 6, left: 6, right: -6, bottom: -6 },
    startBtnFront: { backgroundColor: c.bg, borderWidth: 2, paddingVertical: 18, alignItems: 'center' },
    startBtnTitle: { fontSize: 18, fontWeight: '900', letterSpacing: 2 },
    startBtnSubtitle: { color: c.subText, fontSize: 9, letterSpacing: 3, marginTop: 4 },

    // Default Cards
    card: { backgroundColor: c.card, borderWidth: 1, borderColor: c.border, padding: 20, marginBottom: 15, alignItems: 'center' },
    cardLabel: { color: c.subText, fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 10, textAlign: 'center' },
    cardValueBig: { color: '#39FF14', fontSize: 48, fontWeight: '900', fontVariant: ['tabular-nums'] },
    
    // Shop
    shopCard: { flexDirection: 'row', backgroundColor: c.card, borderWidth: 1, borderColor: c.border, padding: 15, marginBottom: 15, alignItems: 'center', justifyContent: 'space-between' },
    shopCardLeft: { flexDirection: 'row', alignItems: 'center' },
    shopItemIconBox: { width: 50, height: 50, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: c.bg },
    shopItemEmoji: { fontSize: 24 },
    shopItemInfo: { marginLeft: 15 },
    shopItemName: { fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
    shopItemPrice: { color: isDark ? '#F9E154' : '#C2A300', fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
    shopItemStats: { color: c.subText, fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },
    buyBtn: { paddingVertical: 10, paddingHorizontal: 15, borderWidth: 2, borderRadius: 0 },
    buyBtnAfford: { backgroundColor: isDark ? '#1A2F20' : '#E8F5E9', borderColor: '#39FF14' },
    buyBtnBroke: { backgroundColor: c.border, borderColor: c.subText },
    buyBtnOwned: { backgroundColor: c.bg, borderColor: c.border },
    buyBtnText: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
    buyBtnTextActive: { color: isDark ? '#FFF' : '#111' },
    buyBtnTextOwned: { color: c.subText },

    // Gear
    gearGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 20 },
    gearSlot: { aspectRatio: 1, backgroundColor: c.card, borderWidth: 2, borderColor: c.border, alignItems: 'center', justifyContent: 'center', position: 'relative' },
    gearSlotOwned: { backgroundColor: isDark ? '#1A1C20' : '#F9FBDB' },
    equippedBadge: { position: 'absolute', top: 10, fontSize: 9, fontWeight: '900', letterSpacing: 1, zIndex: 10 },
    gearIconWrapper: { alignItems: 'center', justifyContent: 'center', height: 90 },
    gearName: { position: 'absolute', bottom: 20, color: c.text, fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
    gearMultiplier: { position: 'absolute', bottom: 6, color: c.subText, fontSize: 8, fontWeight: 'bold', letterSpacing: 1 },
    lockedIcon: { fontSize: 32, opacity: 0.5 },
    gearNameLocked: { position: 'absolute', bottom: 10, color: c.subText, fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },

    // Quests
    questCardRow: { flexDirection: 'column', width: '100%' },
    questDesc: { color: c.text, fontSize: 12, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
    questClaimBtn: { backgroundColor: '#39FF14', paddingVertical: 12, width: '100%', alignItems: 'center', marginTop: 10 },
    questClaimText: { color: '#111', fontWeight: '900', letterSpacing: 2, fontSize: 14 },

    // Nav
    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: c.navBg, borderTopWidth: 2, borderColor: c.divider },
    navItem: { flex: 1 },
    navItemInner: { alignItems: 'center', paddingVertical: 15 },
    navItemActive: { borderTopWidth: 2, borderColor: '#39FF14', marginTop: -2 },
    navIcon: { fontSize: 20, color: c.subText, marginBottom: 4 },
    navText: { fontSize: 9, fontWeight: 'bold', color: c.subText, letterSpacing: 1 },

    // Modal
    modalContainer: { flex: 1, backgroundColor: c.bg, paddingTop: 40 },
    modalContent: { paddingHorizontal: 20 },
    modalHeader: { fontSize: 24, fontWeight: '900', color: c.text, textAlign: 'center', marginBottom: 20, letterSpacing: 2 },
    modalAvatarBox: { alignItems: 'center', marginBottom: 20, padding: 20, backgroundColor: c.card, borderWidth: 2, borderColor: '#39FF14' },
    modalAvatarName: { fontSize: 18, fontWeight: '900', color: c.text, marginTop: 10, letterSpacing: 2 },
    avatarSelectRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.card, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: c.border },

    // Overlay
    overlayContainer: { ...StyleSheet.absoluteFillObject, backgroundColor: c.overlayBg, zIndex: 100, alignItems: 'center', justifyContent: 'center', padding: 20 },
    overlayContent: { width: '100%', backgroundColor: c.card, borderWidth: 2, borderColor: '#39FF14', padding: 40, alignItems: 'center', shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 30, elevation: 20 },
    overlayTitle: { fontSize: 28, fontWeight: '900', color: '#39FF14', letterSpacing: 4, marginBottom: 20, textAlign: 'center' },
    rewardBox: { backgroundColor: isDark ? '#1E2227' : '#E8ECEF', padding: 15, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: c.border, marginBottom: 30 },
    rewardText: { color: c.text, fontSize: 16, fontWeight: 'bold', letterSpacing: 2 },
    levelUpText: { color: '#F9E154', fontSize: 12, fontWeight: 'bold', marginTop: 10, letterSpacing: 1 },
    dismissBtn: { backgroundColor: '#39FF14', paddingVertical: 15, paddingHorizontal: 40 },
    dismissBtnText: { color: '#111', fontSize: 16, fontWeight: '900', letterSpacing: 3 },
  });
};


// --- APP ENTRY --- //

export default function App() {
  const [theme, setTheme] = useState('dark');
  const styles = getStyles(theme);

  const [currentTab, setCurrentTab] = useState('BATTLE');

  // Battle State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [bossHp, setBossHp] = useState(100);

  // Persistent Stats & Economy & Quests
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [hp, setHp] = useState(88);
  const [mp, setMp] = useState(42);
  const [battlesWon, setBattlesWon] = useState(0);
  const [bossesKilled, setBossesKilled] = useState(0);
  const [gold, setGold] = useState(500); 
  const [inventory, setInventory] = useState(['neon_katana']);
  const [equipped, setEquipped] = useState('neon_katana');
  const [questsClaimed, setQuestsClaimed] = useState([]);
  
  const [currentAvatar, setCurrentAvatar] = useState('default');
  const [ownedAvatars, setOwnedAvatars] = useState(['default']);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Overlay State & Anims
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState('conquered'); 
  const [shopMessage, setShopMessage] = useState(null);
  const [lastRewards, setLastRewards] = useState({ xp: 0, gold: 0, modifier: '' });

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const overlayScale = useRef(new Animated.Value(0)).current;
  const startGlowAnim = useRef(new Animated.Value(0.4)).current;
  const swingAnim = useRef(new Animated.Value(0)).current;
  const bossShakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadStats = async () => {
      try {
        const payload = await AsyncStorage.multiGet([
          '@level', '@xp', '@hp', '@mp', '@battlesWon', '@gold', '@inventory', '@equipped', '@theme', '@bosses', '@quests', '@avatar', '@ownedAvatars'
        ]);
        const db = Object.fromEntries(payload);
        
        if (db['@level']) setLevel(parseInt(db['@level']));
        if (db['@xp']) setXp(parseInt(db['@xp']));
        if (db['@hp']) setHp(parseInt(db['@hp']));
        if (db['@mp']) setMp(parseInt(db['@mp']));
        if (db['@battlesWon']) setBattlesWon(parseInt(db['@battlesWon']));
        if (db['@gold']) setGold(parseInt(db['@gold']));
        if (db['@inventory']) setInventory(JSON.parse(db['@inventory']));
        if (db['@equipped']) setEquipped(db['@equipped']);
        if (db['@theme']) setTheme(db['@theme']);
        if (db['@bosses']) setBossesKilled(parseInt(db['@bosses']));
        if (db['@quests']) setQuestsClaimed(JSON.parse(db['@quests']));
        if (db['@avatar']) setCurrentAvatar(db['@avatar']);
        if (db['@ownedAvatars']) setOwnedAvatars(JSON.parse(db['@ownedAvatars']));
      } catch (e) { console.warn(e); }
    };
    loadStats();
  }, []);

  const persistState = async (updates) => {
    try {
      const dbPairs = Object.entries(updates).map(([k, v]) => [`@${k}`, typeof v === 'object' ? JSON.stringify(v) : String(v)]);
      await AsyncStorage.multiSet(dbPairs);
    } catch (e) { console.warn(e); }
  };

  const syncAll = (updates) => persistState({ level, xp, hp, mp, battlesWon, gold, inventory, equipped, theme, bosses: bossesKilled, quests: questsClaimed, avatar: currentAvatar, ownedAvatars, ...updates });

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, bossHp]);

  // Core Anims
  useEffect(() => {
    const startPulse = () => {
      Animated.loop(Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])).start();
    };

    if (isActive) {
      pulseAnim.setValue(1);
      Animated.loop(Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 250, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ])).start();
    } else startPulse(); 

    Animated.loop(Animated.sequence([
      Animated.timing(startGlowAnim, { toValue: 0.9, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(startGlowAnim, { toValue: 0.4, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();

    return () => { pulseAnim.stopAnimation(); startGlowAnim.stopAnimation(); };
  }, [isActive, pulseAnim, startGlowAnim]);

  useEffect(() => {
    if (showOverlay) {
      overlayScale.setValue(0);
      Animated.spring(overlayScale, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }).start();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [showOverlay]);

  // Boss Combat Mechanic
  const handleWeaponTap = () => {
    const isBossActive = timeLeft <= 60 && timeLeft > 0;
    if (!isActive || !isBossActive || bossHp <= 0) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    bossShakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(bossShakeAnim, { toValue: 10, duration: 40, useNativeDriver: true }),
      Animated.timing(bossShakeAnim, { toValue: -10, duration: 40, useNativeDriver: true }),
      Animated.timing(bossShakeAnim, { toValue: 10, duration: 40, useNativeDriver: true }),
      Animated.timing(bossShakeAnim, { toValue: 0, duration: 40, useNativeDriver: true })
    ]).start();

    // Physics Swing
    swingAnim.setValue(0);
    Animated.sequence([
      Animated.timing(swingAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(swingAnim, { toValue: 0, duration: 120, useNativeDriver: true })
    ]).start();

    // Damage Math
    const wData = WEAPON_DB[equipped];
    const dmg = Math.floor(10 * wData.powerDmg);
    setBossHp(prev => Math.max(0, prev - dmg));
  };


  // Logic Mutators
  const handleSessionComplete = () => {
    setIsActive(false);

    const weaponData = WEAPON_DB[equipped];
    const earnedXp = Math.floor(10 * weaponData.powerXp);
    let earnedGold = Math.floor(50 * weaponData.powerGold);
    let modifierStr = '';
    
    // Check Dragon Bounty
    const bossDefeated = isActive && bossHp <= 0;
    let newBossesKilled = bossesKilled;
    
    if (bossDefeated) {
      earnedGold *= 2;
      modifierStr = 'x2 DRAGON BOUNTY!';
      newBossesKilled += 1;
      setBossesKilled(newBossesKilled);
    }

    setLastRewards({ xp: earnedXp, gold: earnedGold, modifier: modifierStr });

    let newXp = xp + earnedXp;
    let newGold = gold + earnedGold;  
    let newLevel = level;
    let type = bossDefeated ? 'boss_defeated' : 'conquered';
    let newHp = hp;
    let newMp = mp;
    let newBattles = battlesWon + 1;

    if (newXp >= 100) {
      newLevel += 1;
      newXp = newXp - 100;
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
    setBossHp(100); 
    
    setOverlayType(type);
    setShowOverlay(true);

    syncAll({ level: newLevel, xp: newXp, hp: newHp, mp: newMp, battlesWon: newBattles, gold: newGold, bosses: newBossesKilled });
  };

  const handlePurchase = (item) => {
    if (inventory.includes(item.id)) return;
    if (gold >= item.price) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const newGold = gold - item.price;
      const newInv = [...inventory, item.id];
      setGold(newGold);
      setInventory(newInv);
      syncAll({ gold: newGold, inventory: newInv });
      setShopMessage(`🌟 CHA-CHING! ${item.name} ACQUIRED!`);
      setTimeout(() => setShopMessage(null), 2500);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setShopMessage('⚠️ INSUFFICIENT FUNDS!');
      setTimeout(() => setShopMessage(null), 2500);
    }
  };

  const handleAvatarPurchase = (item) => {
    if (ownedAvatars.includes(item.id)) return;
    if (gold >= item.price) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const newGold = gold - item.price;
      const newAvs = [...ownedAvatars, item.id];
      setGold(newGold);
      setOwnedAvatars(newAvs);
      syncAll({ gold: newGold, ownedAvatars: newAvs });
      setShopMessage(`🌟 ${item.name} UNLOCKED!`);
      setTimeout(() => setShopMessage(null), 2500);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setShopMessage('⚠️ INSUFFICIENT FUNDS!');
      setTimeout(() => setShopMessage(null), 2500);
    }
  };

  const claimQuest = (id, rewardAmount) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newGold = gold + rewardAmount;
    const newQuests = [...questsClaimed, id];
    setGold(newGold);
    setQuestsClaimed(newQuests);
    syncAll({ gold: newGold, quests: newQuests });
  };

  const equipWeapon = (id) => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setEquipped(id); syncAll({ equipped: id }); };
  const equipAvatar = (id) => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setCurrentAvatar(id); syncAll({ avatar: id }); };
  const toggleTheme = () => { const nt = theme === 'dark' ? 'light' : 'dark'; setTheme(nt); syncAll({ theme: nt }); };
  const toggleTimer = () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setIsActive(!isActive); };
  const hideOverlay = () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowOverlay(false); setTimeLeft(25 * 60); };
  
  const skipTimerForDev = () => { setTimeLeft(61); setIsActive(true); };

  const lastTapRef = useRef(0);
  const tapCountRef = useRef(0);

  const handleTripleTapDev = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 400) {
      tapCountRef.current += 1;
    } else {
      tapCountRef.current = 1;
    }
    lastTapRef.current = now;

    if (tapCountRef.current === 3) {
      tapCountRef.current = 0;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      skipTimerForDev();
    }
  };

  // ----- MODULAR RENDERS -----

  const renderBattleScreen = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const isBossActive = isActive;
    const ActiveWeaponSVG = WEAPON_DB[equipped].Cmp;
    const activeColor = WEAPON_DB[equipped].color;

    // Boss Bar calc
    const hpRatio = (bossHp / 100) * 100;

    // Swing Physics
    const weaponRotation = swingAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['0deg', '45deg', '0deg'] });

    return (
      <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        {isBossActive && bossHp > 0 && (
          <View style={[styles.bossHpBar, { marginBottom: 15 }]}>
             <View style={[styles.bossHpFill, { width: `${hpRatio}%`, backgroundColor: '#00E5FF' }]} />
          </View>
        )}

        {isBossActive && bossHp > 0 && (
          <Animated.View style={{ alignItems: 'center', marginBottom: 5, transform: [{ scale: pulseAnim }, { translateX: bossShakeAnim }] }}>
             <CyberHydra scale={0.9} />
          </Animated.View>
        )}

        <View style={[styles.dragonContainer, { marginTop: 0 }]}>
          <Pressable onPress={handleWeaponTap} disabled={!isBossActive || bossHp <= 0}>
             <Animated.View style={[styles.dragonWrapper, { transform: [{ scale: !isBossActive ? pulseAnim : 1 }, { rotate: weaponRotation }] }]}>
               <ActiveWeaponSVG color={activeColor} scale={isBossActive ? 1.0 : 1} />
             </Animated.View>
          </Pressable>
        </View>

        <View style={styles.bannerContainer}>
          <View style={[styles.bannerLeftDrop, { backgroundColor: isBossActive && bossHp > 0 ? '#B539FF' : activeColor }]} />
          <Text style={[styles.bannerText, { color: isBossActive && bossHp > 0 ? '#B539FF' : activeColor }]}>
             {isBossActive && bossHp > 0 ? 'CYBER HYDRA AWAKENED!' : `${WEAPON_DB[equipped].name} ENGAGED`}
          </Text>
          <View style={[styles.bannerRightDrop, { backgroundColor: isBossActive && bossHp > 0 ? '#B539FF' : activeColor }]} />
        </View>

        <View style={styles.timerBox}>
          <View style={[styles.cornerSquare, styles.topLeft]} />
          <View style={[styles.cornerSquare, styles.topRight]} />
          <View style={[styles.cornerSquare, styles.bottomLeft]} />
          <View style={[styles.cornerSquare, styles.bottomRight]} />
          <Text style={styles.chronoText}>C H R O N O - L I N K</Text>
          <Text style={styles.timerText}>{formattedTime}</Text>
        </View>

        <View style={styles.startBtnContainer}>
          <Animated.View style={[styles.startBtnBg, { opacity: startGlowAnim, backgroundColor: activeColor }]} />
          <Pressable onPress={toggleTimer}>
            {({ pressed }) => (
              <View style={[styles.startBtnFront, { borderColor: activeColor, transform: [{ scale: pressed ? 0.95 : 1 }] }]}>
                <Text style={[styles.startBtnTitle, { color: activeColor }]}>{isActive ? 'PAUSE BATTLE' : 'START FOCUS BATTLE'}</Text>
                <Text style={styles.startBtnSubtitle}>H A C K  T H E  S Y S T E M</Text>
              </View>
            )}
          </Pressable>
        </View>
      </ScrollView>
    );
  };

  const renderStatsScreen = () => {
    const totalMinutes = battlesWon * 25;
    const xpPercent = Math.min(100, (xp / 100) * 100);

    return (
      <ScrollView style={styles.tabContent}>
        <Text style={styles.sectionHeader}>COMBAT ANALYTICS</Text>
        <View style={styles.dividerBright} />
        
        <View style={styles.card}>
          <Text style={styles.cardLabel}>TOTAL FOCUS MINUTES</Text>
          <Text style={[styles.cardValueBig, { color: '#42E6F5' }]}>{totalMinutes}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={[styles.card, { width: '48%', padding: 15 }]}>
            <Text style={styles.cardLabel}>VICTORIES</Text>
            <Text style={styles.cardValueBig}>{battlesWon}</Text>
          </View>
          <View style={[styles.card, { width: '48%', padding: 15 }]}>
            <Text style={styles.cardLabel}>BOSSES KILLED</Text>
            <Text style={[styles.cardValueBig, { color: '#FF3B30' }]}>{bossesKilled}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>CURRENT LEVEL</Text>
          <Text style={[styles.cardValueBig, { color: '#FF647C' }]}>{level}</Text>
          <View style={[styles.progressBarBg, { marginTop: 15, height: 20 }]}>
            <View style={[styles.progressBarFill, { backgroundColor: '#FF647C', width: `${xpPercent}%` }]} />
            <Text style={{ position: 'absolute', width: '100%', textAlign: 'center', color: '#111', fontWeight: 'bold', fontSize: 10, marginTop: 2 }}>{xp} / 100 XP</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderQuestsScreen = () => {
    const marathonMins = battlesWon * 25;
    const slayerFulfilled = bossesKilled >= 3;
    const marathonFulfilled = marathonMins >= 75;
    
    const slayerClaimed = questsClaimed.includes('slayer');
    const marathonClaimed = questsClaimed.includes('marathon');

    return (
      <View style={styles.tabContent}>
         <Text style={styles.sectionHeader}>BOUNTY BOARD</Text>
         <View style={styles.dividerBright} />

         {/* SLAYER QUEST */}
         <View style={styles.card}>
           <View style={styles.questCardRow}>
              <Text style={[styles.cardLabel, { color: '#B539FF', fontSize: 14 }]}>HYDRA SLAYER</Text>
              <Text style={styles.questDesc}>Eliminate the Cyber Hydra 3 times during your focus sessions.</Text>
              <View style={[styles.progressBarBg, { height: 16 }]}>
                 <View style={[styles.progressBarFill, { backgroundColor: '#B539FF', width: `${Math.min(100, (bossesKilled/3)*100)}%` }]} />
                 <Text style={{ position: 'absolute', width: '100%', textAlign: 'center', color: '#FFF', fontWeight: 'bold', fontSize: 10 }}>{bossesKilled} / 3 LIVES</Text>
              </View>
              
              <Pressable disabled={!slayerFulfilled || slayerClaimed} onPress={() => claimQuest('slayer', 200)}>
                {({ pressed }) => (
                  <View style={[styles.questClaimBtn, (!slayerFulfilled || slayerClaimed) && { backgroundColor: styles.border, opacity: 0.5 }, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}>
                    <Text style={[styles.questClaimText, (!slayerFulfilled || slayerClaimed) && { color: '#888' }]}>
                      {slayerClaimed ? 'CLAIMED' : (slayerFulfilled ? 'REWARD: +200 GOLD' : 'BATTLE REQUIRED')}
                    </Text>
                  </View>
                )}
              </Pressable>
           </View>
         </View>

         {/* MARATHON QUEST */}
         <View style={styles.card}>
           <View style={styles.questCardRow}>
              <Text style={[styles.cardLabel, { color: '#42E6F5', fontSize: 14 }]}>NEON MARATHON</Text>
              <Text style={styles.questDesc}>Sustain the chrono-link engine for 75 total minutes.</Text>
              <View style={[styles.progressBarBg, { height: 16 }]}>
                 <View style={[styles.progressBarFill, { backgroundColor: '#42E6F5', width: `${Math.min(100, (marathonMins/75)*100)}%` }]} />
                 <Text style={{ position: 'absolute', width: '100%', textAlign: 'center', color: '#111', fontWeight: 'bold', fontSize: 10 }}>{marathonMins} / 75 MIN</Text>
              </View>

              <Pressable disabled={!marathonFulfilled || marathonClaimed} onPress={() => claimQuest('marathon', 500)}>
                {({ pressed }) => (
                  <View style={[styles.questClaimBtn, (!marathonFulfilled || marathonClaimed) && { backgroundColor: styles.border, opacity: 0.5 }, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}>
                    <Text style={[styles.questClaimText, (!marathonFulfilled || marathonClaimed) && { color: '#888' }]}>
                      {marathonClaimed ? 'CLAIMED' : (marathonFulfilled ? 'REWARD: +500 GOLD' : 'FOCUS REQUIRED')}
                    </Text>
                  </View>
                )}
              </Pressable>
           </View>
         </View>
      </View>
    );
  };

  const renderShopScreen = () => (
    <View style={styles.tabContent}>
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
        <Text style={[styles.cardLabel, { marginBottom: 2 }]}>AVAILABLE FUNDS</Text>
        <Text style={[styles.cardValueBig, { color: theme === 'dark' ? '#F9E154' : '#C2A300', fontSize: 36 }]}>{gold} GOLD</Text>
      </View>
      <View style={styles.dividerBright} />
      <Text style={styles.sectionHeader}>NEXUS MARKET</Text>

      {shopMessage && (
        <View style={styles.shopMessagePrompt}>
          <Text style={[styles.shopMessageText, shopMessage.includes('INSUFFICIENT') && { color: '#FF647C' }]}>{shopMessage}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {SHOP_ITEMS.map((item) => {
          const isOwned = inventory.includes(item.id);
          const canAfford = gold >= item.price;
          return (
            <View key={item.id} style={styles.shopCard}>
              <View style={styles.shopCardLeft}>
                 <View style={[styles.shopItemIconBox, { borderColor: item.color }]}><Text style={styles.shopItemEmoji}>{item.icon}</Text></View>
                 <View style={styles.shopItemInfo}>
                   <Text style={[styles.shopItemName, { color: item.color }]}>{item.name}</Text>
                   <Text style={styles.shopItemPrice}>{item.price} GOLD</Text>
                   <Text style={styles.shopItemStats}>XP x{item.powerXp} | GLD x{item.powerGold} | DMG x{item.powerDmg}</Text>
                 </View>
              </View>
              <Pressable onPress={() => handlePurchase(item)} disabled={isOwned}>
                {({ pressed }) => (
                  <View style={[styles.buyBtn, isOwned ? styles.buyBtnOwned : (canAfford ? styles.buyBtnAfford : styles.buyBtnBroke), { transform: [{ scale: pressed ? 0.9 : 1 }] }]}>
                    <Text style={[styles.buyBtnText, isOwned ? styles.buyBtnTextOwned : styles.buyBtnTextActive]}>{isOwned ? 'OWNED' : 'BUY'}</Text>
                  </View>
                )}
              </Pressable>
            </View>
          );
        })}

        <View style={[styles.dividerBright, { marginTop: 15 }]} />
        <Text style={styles.sectionHeader}>AVATAR LAB</Text>

        {AVATAR_SHOP.map((item) => {
          const isOwned = ownedAvatars.includes(item.id);
          const canAfford = gold >= item.price;
          return (
            <View key={item.id} style={styles.shopCard}>
              <View style={styles.shopCardLeft}>
                 <View style={[styles.shopItemIconBox, { borderColor: item.color }]}><Text style={styles.shopItemEmoji}>{item.icon}</Text></View>
                 <View style={styles.shopItemInfo}>
                   <Text style={[styles.shopItemName, { color: item.color }]}>{item.name}</Text>
                   <Text style={styles.shopItemPrice}>{item.price} GOLD</Text>
                   <Text style={styles.shopItemStats}>PROFILE COSMETIC</Text>
                 </View>
              </View>
              <Pressable onPress={() => handleAvatarPurchase(item)} disabled={isOwned}>
                {({ pressed }) => (
                  <View style={[styles.buyBtn, isOwned ? styles.buyBtnOwned : (canAfford ? styles.buyBtnAfford : styles.buyBtnBroke), { transform: [{ scale: pressed ? 0.9 : 1 }] }]}>
                    <Text style={[styles.buyBtnText, isOwned ? styles.buyBtnTextOwned : styles.buyBtnTextActive]}>{isOwned ? 'OWNED' : 'BUY'}</Text>
                  </View>
                )}
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderGearScreen = () => {
    const totalOwned = inventory.length; 
    const lockedCount = Math.max(0, 6 - totalOwned);
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionHeader}>ARMORY</Text>
        <View style={styles.dividerBright} />
        <ScrollView contentContainerStyle={styles.gearGrid}>
          {inventory.map(id => {
            const item = WEAPON_DB[id];
            const isEquipped = equipped === id;
            const ActSVG = item.Cmp;
            return (
               <Pressable key={id} onPress={() => equipWeapon(id)} style={{ width: '48%', marginBottom: 15 }}>
                 {({ pressed }) => (
                   <View style={[styles.gearSlot, styles.gearSlotOwned, { borderColor: isEquipped ? item.color : styles.border }, isEquipped && { backgroundColor: theme === 'dark' ? '#1A2328' : '#FFFFFF', shadowColor: item.color, elevation: 8 }, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}>
                     <Text style={[styles.equippedBadge, { color: isEquipped ? item.color : '#8A94A6' }]}>{isEquipped ? '[ EQUIPPED ]' : '[ OWNED ]'}</Text>
                     <View style={styles.gearIconWrapper}><ActSVG color={isEquipped ? item.color : '#8A94A6'} scale={0.4} /></View>
                     <Text style={[styles.gearName, { color: isEquipped ? item.color : styles.cardLabel.color }]}>{item.name}</Text>
                     <Text style={styles.gearMultiplier}>PWR: XP x{item.powerXp}</Text>
                   </View>
                 )}
               </Pressable>
            );
          })}
          {Array(lockedCount).fill(0).map((_, idx) => (
            <View key={`locked-${idx}`} style={[styles.gearSlot, { width: '48%', marginBottom: 15 }]}><Text style={styles.lockedIcon}>🔒</Text><Text style={styles.gearNameLocked}>LOCKED SLOT</Text></View>
          ))}
        </ScrollView>
      </View>
    );
  };

  // ----- MAIN MAP -----

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme === 'dark' ? '#2A2E35' : '#E8ECEF'} />
      
      <View style={styles.topBar}>
        <View style={styles.profileSection}>
          <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setProfileModalVisible(true); }}>
            {({ pressed }) => {
              const AcAvatar = AVATAR_DB[currentAvatar].Cmp;
              const acColor = AVATAR_DB[currentAvatar].color;
              return (
                <View style={[styles.avatarBox, { borderColor: acColor, backgroundColor: theme === 'dark' ? '#111' : '#FFF', transform: [{ scale: pressed ? 0.9 : 1 }] }]}>
                  <AcAvatar color={acColor} scale={0.7} />
                </View>
              )
            }}
          </Pressable>
          <Pressable onPress={handleTripleTapDev}>
            <View>
              <Text style={[styles.username, { color: AVATAR_DB[currentAvatar].color }]}>{AVATAR_DB[currentAvatar].name}</Text>
              <Text style={styles.levelText}>LVL {level} | XP: {xp}/100</Text>
            </View>
          </Pressable>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           <View style={[styles.goldPill, { marginRight: 15 }]}><Text style={styles.goldPillText}>{gold} GLD</Text></View>
           <Pressable onPress={toggleTheme}>{({ pressed }) => (<View style={[styles.themeBtn, { transform: [{ scale: pressed ? 0.9 : 1 }] }]}><Text>{theme === 'dark' ? '☀️' : '🌙'}</Text></View>)}</Pressable>
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.statsSection}>
        <View style={styles.statContainer}>
          <View style={styles.statRow}><Text style={[styles.statLabel, {color: '#FF647C'}]}>HP / STAMINA</Text><Text style={[styles.statValue, {color: '#FF647C'}]}>{hp}%</Text></View>
          <View style={styles.progressBarBg}><View style={[styles.progressBarFill, {backgroundColor: '#FF647C', width: `${hp}%`}]} /></View>
        </View>
        <View style={styles.statContainer}>
          <View style={styles.statRow}><Text style={[styles.statLabel, {color: '#42E6F5'}]}>MP / FOCUS</Text><Text style={[styles.statValue, {color: '#42E6F5'}]}>{mp}%</Text></View>
          <View style={styles.progressBarBg}><View style={[styles.progressBarFill, {backgroundColor: '#42E6F5', width: `${mp}%`}]} /></View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {currentTab === 'BATTLE' && renderBattleScreen()}
        {currentTab === 'QUESTS' && renderQuestsScreen()}
        {currentTab === 'STATS' && renderStatsScreen()}
        {currentTab === 'GEAR' && renderGearScreen()}
        {currentTab === 'SHOP' && renderShopScreen()}
      </View>

      <View style={styles.bottomNav}>
        {[
          { tab: 'BATTLE', icon: '⚔️', color: '#39FF14' },
          { tab: 'QUESTS', icon: '📋', color: '#FF3B30' },
          { tab: 'STATS', icon: '📊', color: '#42E6F5' },
          { tab: 'SHOP', icon: '🏪', color: '#F9E154' },
          { tab: 'GEAR', icon: '⚙️', color: '#B539FF' }
        ].map(({ tab, icon, color }) => (
          <Pressable key={tab} style={styles.navItem} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setCurrentTab(tab); }}>
            {({ pressed }) => (
              <View style={[styles.navItemInner, currentTab === tab && styles.navItemActive, currentTab === tab && { borderColor: color }, { transform: [{ scale: pressed ? 0.9 : 1 }] }]}>
                <Text style={[styles.navIcon, currentTab === tab && {color}]}>{icon}</Text>
                <Text style={[styles.navText, currentTab === tab && {color}]}>{tab}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {showOverlay && (
        <View style={styles.overlayContainer}>
          <Animated.View style={[styles.overlayContent, { transform: [{ scale: overlayScale }] }]}>
            <Text style={[styles.overlayTitle, overlayType === 'boss_defeated' ? { color: '#B539FF' } : (overlayType === 'levelup' ? { color: '#F9E154' } : { color: '#39FF14' })]}>
              {overlayType === 'boss_defeated' ? 'CYBER HYDRA SLAIN!' : (overlayType === 'levelup' ? 'LEVEL UP!' : 'CONQUERED')}
            </Text>
            
            <View style={styles.rewardBox}>
              <Text style={styles.rewardText}>+{lastRewards.xp} XP EARNED</Text>
              <Text style={[styles.rewardText, { color: '#F9E154', marginTop: 10 }]}>+{lastRewards.gold} GOLD EARNED</Text>
              {lastRewards.modifier !== '' && <Text style={{ color: '#FF3B30', fontSize: 16, fontWeight: '900', letterSpacing: 2, marginTop: 10 }}>{lastRewards.modifier}</Text>}
              {overlayType === 'levelup' && <Text style={styles.levelUpText}>HP & MP RESTORED</Text>}
            </View>

            <Pressable onPress={hideOverlay}>
              {({ pressed }) => (<View style={[styles.dismissBtn, { transform: [{ scale: pressed ? 0.9 : 1 }] }]}><Text style={styles.dismissBtnText}>ONWARD</Text></View>)}
            </Pressable>
          </Animated.View>
        </View>
      )}

      <Modal visible={profileModalVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setProfileModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalHeader}>PROFILE HUB</Text>
          <View style={styles.modalContent}>
             <View style={[styles.modalAvatarBox, { borderColor: AVATAR_DB[currentAvatar].color }]}>
                { React.createElement(AVATAR_DB[currentAvatar].Cmp, { color: AVATAR_DB[currentAvatar].color, scale: 3.5 }) }
                <Text style={[styles.modalAvatarName, { color: AVATAR_DB[currentAvatar].color }]}>{AVATAR_DB[currentAvatar].name}</Text>
             </View>
             <Text style={styles.sectionHeader}>CHANGE AVATAR</Text>
             <View style={styles.dividerBright} />
             <ScrollView>
               {ownedAvatars.map(id => {
                 const av = AVATAR_DB[id];
                 const isAvEq = currentAvatar === id;
                 const AvCmp = av.Cmp;
                 return (
                   <View key={id} style={styles.avatarSelectRow}>
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}><AvCmp color={av.color} scale={1.2} /></View>
                       <Text style={{ fontSize: 16, fontWeight: 'bold', color: av.color }}>{av.name}</Text>
                     </View>
                     <Pressable onPress={() => equipAvatar(id)} disabled={isAvEq}>
                       {({ pressed }) => (
                         <View style={[styles.buyBtn, isAvEq ? styles.buyBtnOwned : styles.buyBtnAfford, { transform: [{ scale: pressed ? 0.9 : 1 }] }]}>
                           <Text style={[styles.buyBtnText, isAvEq && styles.buyBtnTextOwned]}>{isAvEq ? 'ACTIVE' : 'SELECT'}</Text>
                         </View>
                       )}
                     </Pressable>
                   </View>
                 );
               })}
             </ScrollView>
          </View>
          <Pressable style={{ position: 'absolute', top: Platform.OS==='android'? 20: 30, right: 30 }} onPress={() => setProfileModalVisible(false)}>
            <Text style={{ color: styles.sectionHeader.color, fontSize: 32, fontWeight: 'bold' }}>×</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}
