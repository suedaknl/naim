import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import Svg, { Polygon, Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// NO COMMENTS INSIDE SVG TAG TO PREVENT RENDERING TEXT ARTIFACTS
const NeonSword = ({ color = '#39FF14' }) => (
  <Svg viewBox="0 0 100 300" width={100} height={240}>
    {/* Energy Core / Main Blade */}
    <Polygon points="50,10 65,40 60,200 40,200 35,40" fill={color} />
    {/* Inner super-hot white energy core */}
    <Polygon points="50,20 55,45 52,195 48,195 45,45" fill="#FFFFFF" fillOpacity="0.5" />
    
    {/* Cyber-ninja Tsuba (Crossguard) */}
    <Polygon points="20,200 80,200 85,210 75,220 25,220 15,210" fill="#2A2E35" stroke={color} strokeWidth="3" />
    <Path d="M30,210 L70,210" fill="none" stroke={color} strokeWidth="1.5" />
    
    {/* Mechanical Hilt */}
    <Polygon points="40,220 60,220 57,270 43,270" fill="#2A2E35" stroke={color} strokeWidth="2" />
    
    {/* Grip textures */}
    <Path d="M42,230 L58,230 M42,240 L58,240 M43,250 L57,250 M44,260 L56,260" fill="none" stroke={color} strokeWidth="2" />
    
    {/* Pommel */}
    <Polygon points="35,270 65,270 60,285 40,285" fill={color} />
    <Circle cx="50" cy="277" r="2" fill="#2A2E35" />
    
    {/* Abstract tech floating pieces near blade */}
    <Polygon points="25,40 30,35 30,60 25,65" fill={color} />
    <Polygon points="75,40 70,35 70,60 75,65" fill={color} />
    <Polygon points="30,80 33,75 33,120 30,125" fill={color} fillOpacity="0.5" />
    <Polygon points="70,80 67,75 67,120 70,125" fill={color} fillOpacity="0.5" />
  </Svg>
);

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

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
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 350, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
        ])
      ).start();
    } else {
      startPulse();
    }
    return () => pulseAnim.stopAnimation();
  }, [isActive, pulseAnim]);

  const toggleTimer = () => setIsActive(!isActive);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2A2E35" />
      
      {/* 1. Header Row Context */}
      <View style={styles.topBar}>
        <View style={styles.profileSection}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.username}>NEON_CHROMA</Text>
          <Text style={styles.lightningIcon}>⚡</Text>
        </View>
      </View>
      
      <View style={styles.divider} />

      {/* 2. Progress Bars */}
      <View style={styles.statsSection}>
        <View style={styles.statContainer}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, {color: '#FF647C'}]}>HP / STAMINA</Text>
            <Text style={[styles.statValue, {color: '#FF647C'}]}>88%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {backgroundColor: '#FF647C', width: '88%'}]} />
          </View>
        </View>
        
        <View style={styles.statContainer}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, {color: '#42E6F5'}]}>MP / FOCUS</Text>
            <Text style={[styles.statValue, {color: '#42E6F5'}]}>42%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {backgroundColor: '#42E6F5', width: '42%'}]} />
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        
        {/* Dragon Graphic */}
        <View style={styles.dragonContainer}>
          <Animated.View style={[styles.dragonWrapper, { transform: [{ scale: pulseAnim }] }]}>
            <NeonSword color="#39FF14" />
          </Animated.View>
        </View>

        {/* Dragon Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerLeftDrop} />
          <Text style={styles.bannerText}>ANCIENT DISTRACTION BEAST</Text>
          <View style={styles.bannerRightDrop} />
        </View>

        {/* Timer Box */}
        <View style={styles.timerBox}>
          {/* Corner Squares */}
          <View style={[styles.cornerSquare, styles.topLeft]} />
          <View style={[styles.cornerSquare, styles.topRight]} />
          <View style={[styles.cornerSquare, styles.bottomLeft]} />
          <View style={[styles.cornerSquare, styles.bottomRight]} />
          
          <Text style={styles.chronoText}>C H R O N O - L I N K</Text>
          <Text style={styles.chronoText}>S Y N C H R O N I Z E D</Text>
          <Text style={styles.timerText}>{formattedTime}</Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startBtnContainer} onPress={toggleTimer} activeOpacity={0.8}>
          <View style={styles.startBtnBg} />
          <View style={styles.startBtnFront}>
            <Text style={styles.startBtnTitle}>{isActive ? 'PAUSE BATTLE' : 'START FOCUS BATTLE'}</Text>
            <Text style={styles.startBtnSubtitle}>P R E P A R E  F O R  D E E P  W O R K</Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={[styles.navItem, styles.navItemActive]}>
          <Text style={[styles.navIcon, {color: '#39FF14'}]}>⚔️</Text>
          <Text style={[styles.navText, {color: '#39FF14'}]}>BATTLE</Text>
        </View>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>STATS</Text>
        </View>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>🏪</Text>
          <Text style={styles.navText}>SHOP</Text>
        </View>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navText}>GEAR</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2E35', // Matte charcoal grey
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 38,
    height: 38,
    backgroundColor: '#1C2025',
    borderWidth: 1.5,
    borderColor: '#39FF14',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  username: {
    fontSize: 18,
    fontWeight: '800',
    color: '#39FF14',
    letterSpacing: 2,
  },
  lightningIcon: {
    fontSize: 18,
    marginLeft: 15,
  },
  divider: {
    height: 4,
    backgroundColor: '#1C2025',
    width: '100%',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 12,
  },
  statContainer: {
    width: '100%',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 11,
    fontWeight: '900',
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#1A1C20',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dragonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    marginTop: 10,
  },
  dragonWrapper: {
    zIndex: 2,
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  },
  bannerLeftDrop: {
    width: 4,
    height: 20,
    backgroundColor: '#FF647C',
    marginRight: 6,
  },
  bannerRightDrop: {
    width: 4,
    height: 20,
    backgroundColor: '#FF647C',
    marginLeft: 6,
  },
  bannerText: {
    color: '#FF647C',
    fontSize: 12,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 3,
  },
  timerBox: {
    width: '100%',
    backgroundColor: '#20242A',
    paddingVertical: 20,
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#111',
  },
  cornerSquare: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#39FF14',
  },
  topLeft: { top: -2, left: -2 },
  topRight: { top: -2, right: -2 },
  bottomLeft: { bottom: -2, left: -2 },
  bottomRight: { bottom: -2, right: -2 },
  chronoText: {
    color: '#8A94A6',
    fontSize: 10,
    letterSpacing: 4,
    marginBottom: 2,
  },
  timerText: {
    fontSize: 70,
    fontWeight: '900',
    color: '#39FF14',
    fontVariant: ['tabular-nums'],
    textShadowColor: 'rgba(57, 255, 20, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginTop: 5,
  },
  startBtnContainer: {
    width: '100%',
    position: 'relative',
    marginTop: 10,
  },
  startBtnBg: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: '#39FF14',
    opacity: 0.5,
  },
  startBtnFront: {
    backgroundColor: '#2A2E35',
    borderWidth: 2,
    borderColor: '#39FF14',
    paddingVertical: 18,
    alignItems: 'center',
  },
  startBtnTitle: {
    color: '#39FF14',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },
  startBtnSubtitle: {
    color: '#8A94A6',
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#22252B',
    paddingVertical: 15,
    borderTopWidth: 2,
    borderColor: '#1C2025',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navItemActive: {
    borderTopWidth: 2,
    borderColor: '#39FF14',
    marginTop: -17,
    paddingTop: 15,
  },
  navIcon: {
    fontSize: 20,
    color: '#6A7486',
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6A7486',
    letterSpacing: 1,
  },
});
