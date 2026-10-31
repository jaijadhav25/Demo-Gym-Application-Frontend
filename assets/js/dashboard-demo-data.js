/* ===================================================================
   GymFlow dashboard demonstration seed.
   Stored separately from live GymFlow data and generated deterministically.
   =================================================================== */
(function () {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const firstNames = ['Aarav', 'Aditi', 'Aisha', 'Akash', 'Ananya', 'Arjun', 'Avni', 'Dev', 'Diya', 'Ishaan', 'Kabir', 'Kavya', 'Mira', 'Neha', 'Nikhil', 'Priya', 'Rohan', 'Saanvi', 'Sameer', 'Tara', 'Vikram', 'Yash', 'Zara', 'Aditya', 'Ira', 'Karan', 'Meera', 'Rahul', 'Sana', 'Varun'];
  const lastNames = ['Sharma', 'Patel', 'Iyer', 'Reddy', 'Mehta', 'Nair', 'Kapoor', 'Rao', 'Malhotra', 'Joshi', 'Desai', 'Khan', 'Menon', 'Kulkarni', 'Chopra', 'Bose', 'Singh', 'Verma', 'Das', 'Pillai', 'Bhat', 'Gupta', 'Jain', 'Mishra', 'Shetty', 'Saxena', 'Dutta', 'Ghosh', 'Sethi', 'Thomas'];
  const gymPrefixes = ['Atlas', 'Apex', 'Ironwood', 'Summit', 'Pulse', 'Titan', 'Elevate', 'Core', 'Forge', 'Momentum', 'Northstar', 'Prime', 'BluePeak', 'Vertex', 'Everfit', 'Urban', 'Lionheart'];
  const gymSuffixes = ['Strength Club', 'Performance Center', 'Fitness Studio', 'Athletic Club', 'Wellness & Training', 'Fitness Collective'];
  const cities = ['Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Delhi', 'Chennai', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Kochi', 'Indore', 'Surat', 'Lucknow', 'Nagpur', 'Coimbatore', 'Gurugram', 'Noida'];
  const trainerNames = ['Priya Nair', 'Arjun Mehta', 'Rohan Kapoor', 'Sana Iyer', 'Kabir Shah', 'Mira Patel', 'Dev Malhotra', 'Ananya Rao', 'Vikram Desai', 'Tara Menon', 'Aarav Singh', 'Neha Joshi'];
  const classNames = ['Strength Foundations', 'Morning HIIT', 'Power Yoga', 'Spin & Sprint', 'Barbell Club', 'Mobility Flow', 'Conditioning Circuit', 'Core & Balance'];
  const demoVersion = 3;

  const pad = value => String(value).padStart(2, '0');
  const toIso = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const offsetDate = (base, days) => {
    const date = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    date.setDate(date.getDate() + days);
    return date;
  };
  const nextWeekday = (base, weekday) => {
    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(weekday);
    let delta = (dayIndex - base.getDay() + 7) % 7;
    if (!delta) delta = 7;
    return offsetDate(base, delta);
  };
  const monthKey = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
  const money = amount => Math.round(Number(amount) || 0);

  function makeMembers(today) {
    const plans = [
      { id: 'gplan_4', name: 'Annual VIP All-Access', count: 180 },
      { id: 'gplan_1', name: 'Standard Monthly', count: 140 },
      { id: 'gplan_2', name: 'Quarterly Fitness Pass', count: 85 },
      { id: 'gplan_3', name: 'Semi-Annual Club', count: 45 }
    ];
    const planFor = index => {
      let cursor = index;
      return plans.find(plan => (cursor -= plan.count) < 0) || plans[0];
    };
    const members = [];
    for (let index = 0; index < 450; index += 1) {
      const name = index === 0 ? 'Aarav Sharma' : `${firstNames[index % firstNames.length]} ${lastNames[Math.floor(index / firstNames.length) % lastNames.length]}`;
      const status = index < 380 ? 'Active' : index < 425 ? 'Expiring' : 'Expired';
      const start = index > 0 && index <= 32
        ? new Date(today.getFullYear(), today.getMonth(), Math.min(index + 1, today.getDate()))
        : offsetDate(today, -((index * 11) % 430 + 45));
      const expiry = status === 'Expired'
        ? offsetDate(today, -((index % 85) + 2))
        : status === 'Expiring'
          ? offsetDate(today, (index % 29) + 1)
          : offsetDate(today, 35 + ((index * 7) % 330));
      const plan = planFor(index);
      members.push({
        id: index === 0 ? 'mem_101' : `demo_mem_${pad(Math.floor(index / 100))}${String(index + 1).padStart(3, '0')}`,
        demoRecord: true,
        gymId: 'gym_1',
        gymName: 'IronPulse Fitness Club',
        branchId: index % 2 ? 'br_1' : 'br_2',
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.in`,
        phone: `+91 98${String(10000000 + index * 137).slice(-8)}`,
        gender: index % 2 ? 'Female' : 'Male',
        dateOfBirth: index === 0 ? '1997-04-18' : toIso(offsetDate(today, -((index * 113) % 13000 + 6500))),
        dob: index === 0 ? '1997-04-18' : toIso(offsetDate(today, -((index * 113) % 13000 + 6500))),
        emergencyContact: index === 0 ? '+91 98765 43210' : `+91 99${String(11000000 + index * 71).slice(-8)}`,
        fitnessGoal: index === 0 ? 'Build strength and improve endurance' : ['Weight Management', 'Build Strength', 'Improve Fitness'][index % 3],
        targetWeightKg: index === 0 ? 75 : null,
        weightKg: index === 0 ? 82.1 : null,
        monthlyAttendanceGoal: index === 0 ? 20 : 16,
        paymentFrequency: index === 0 ? 'Monthly installment' : 'Plan term',
        branchName: index % 2 ? 'Andheri West' : 'Bandra Central',
        avatar: '',
        planId: plan.id,
        planName: plan.name,
        startDate: toIso(start),
        expiryDate: toIso(expiry),
        paymentStatus: index % 37 === 0 ? 'Pending' : 'Paid',
        status,
        assignedTrainer: `Coach ${trainerNames[index % trainerNames.length]}`,
        notes: index === 0 ? 'Prefers morning strength sessions. No current injuries.' : ''
      });
    }
    return members;
  }

  function makeGymPayments(members, today) {
    const payments = [];
    const monthlyTargets = [350000, 380000, 415000, 440000, 465000, 485000];
    const methods = ['UPI', 'Credit Card', 'Net Banking', 'Debit Card', 'Cash'];
    for (let monthOffset = 5; monthOffset >= 0; monthOffset -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
      const target = monthlyTargets[5 - monthOffset];
      const installment = Math.floor((target - 2000) / 49);
      for (let index = 0; index < 50; index += 1) {
        const amount = index === 0 ? 2000 : index === 49 ? target - 2000 - installment * 48 : installment;
        const paidDate = new Date(date.getFullYear(), date.getMonth(), Math.min(2 + (index * 3) % 26, monthOffset === 0 ? today.getDate() : 28));
        const member = index === 0 ? members[0] : members[(index * 7 + monthOffset * 13) % members.length];
        payments.push({
          id: `demo_pay_${monthOffset}_${String(index + 1).padStart(2, '0')}`,
          demoRecord: true,
          gymId: 'gym_1',
          memberId: member.id,
          memberName: member.name,
          invoiceNo: `IP-${monthKey(date).replace('-', '')}-${String(index + 1).padStart(4, '0')}`,
          invoiceNumber: `IP-${monthKey(date).replace('-', '')}-${String(index + 1).padStart(4, '0')}`,
          description: member.id === 'mem_101' ? `${member.planName} monthly installment` : `${member.planName} membership payment`,
          amount: money(amount),
          date: toIso(paidDate),
          method: methods[index % methods.length],
          status: 'Paid'
        });
      }
    }
    for (let index = 0; index < 5; index += 1) {
      const member = index === 0 ? members[0] : members[32 + index];
      payments.push({
        id: `demo_pay_pending_${index + 1}`,
        demoRecord: true,
        gymId: 'gym_1',
        memberId: member.id,
        memberName: member.name,
        invoiceNo: `IP-PEND-${String(index + 1).padStart(4, '0')}`,
        invoiceNumber: `IP-PEND-${String(index + 1).padStart(4, '0')}`,
        description: `${member.planName} renewal`,
        amount: 5700,
        date: toIso(offsetDate(today, -((index % 5) + 1))),
        dueDate: toIso(offsetDate(today, (index % 8) + 1)),
        method: methods[index % methods.length],
        status: 'Pending'
      });
    }
    payments.push({ id: 'demo_pay_refund_mem101', demoRecord: true, gymId: 'gym_1', memberId: members[0].id, memberName: members[0].name, invoiceNo: 'IP-REF-202610-0101', invoiceNumber: 'IP-REF-202610-0101', description: 'Group class package refund', amount: 2500, date: toIso(offsetDate(today, -9)), method: 'UPI', status: 'Refunded' });
    return payments;
  }

  function makeAttendance(members, today) {
    const counts = [92, 101, 110, 118, 122, 126, 126];
    return counts.flatMap((count, dayIndex) => {
      const date = offsetDate(today, dayIndex - 6);
      return Array.from({ length: count }, (_, index) => {
        const member = members[(dayIndex * 61 + index * 7) % members.length];
        return {
          id: `demo_att_${toIso(date).replace(/-/g, '')}_${String(index + 1).padStart(3, '0')}`,
          demoRecord: true,
          gymId: 'gym_1',
          branchId: index % 2 ? 'br_1' : 'br_2',
          memberId: member.id,
          memberName: member.name,
          date: toIso(date),
          checkInTime: `${pad(5 + (index % 8))}:${pad((index * 7) % 60)} AM`,
          checkOutTime: index % 8 === 0 ? '--' : `${pad(6 + (index % 8))}:${pad((index * 11) % 60)} AM`,
          method: ['QR Code', 'Keycard', 'Front Desk'][index % 3],
          branchName: index % 2 ? 'Andheri West' : 'Bandra Central',
          status: index % 8 === 0 ? 'In Gym' : 'Checked-Out'
        };
      });
    });
  }

  function makeClasses(today, members) {
    const classes = classNames.map((name, index) => ({
      id: `demo_cls_${index + 1}`,
      demoRecord: true,
      gymId: 'gym_1',
      name,
      time: ['06:30 AM', '07:30 AM', '09:00 AM', '05:30 PM'][index % 4],
      duration: '50 min',
      trainerName: trainerNames[index % trainerNames.length],
      capacity: 24,
      bookedCount: 0,
      room: ['Studio A', 'Strength Floor', 'Spin Room', 'Studio B'][index % 4],
      branchName: index % 2 ? 'Andheri West' : 'Bandra Central',
      category: ['Strength', 'HIIT', 'Yoga', 'Cycling', 'Strength', 'Mobility', 'Conditioning', 'Core'][index],
      description: `${name} with ${trainerNames[index % trainerNames.length]} at IronPulse Fitness Club.`,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'][index],
      date: toIso(nextWeekday(today, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'][index])),
      status: 'active'
    }));
    const bookings = [];
    for (let session = 0; session < 14; session += 1) {
      const date = offsetDate(today, session + 1);
      const cls = classes[session % classes.length];
      const count = 10 + (session * 7) % 14;
      for (let index = 0; index < count; index += 1) {
        const member = members[(session * 23 + index * 5) % members.length];
        bookings.push({
          id: `demo_bk_${String(session + 1).padStart(2, '0')}_${String(index + 1).padStart(2, '0')}`,
          demoRecord: true,
          gymId: 'gym_1',
          memberId: member.id,
          memberName: member.name,
          classId: cls.id,
          className: cls.name,
          trainerName: cls.trainerName,
          room: cls.room,
          branchName: cls.branchName,
          date: toIso(date),
          time: cls.time,
          bookingDate: toIso(offsetDate(today, -((session + index) % 10))),
          status: 'Confirmed'
        });
      }
      cls.bookedCount = count;
    }
    const member = members[0];
    [-14, -8].forEach((offset, index) => {
      const cls = classes[index];
      bookings.push({ id: `demo_bk_mem101_attended_${index + 1}`, demoRecord: true, gymId: 'gym_1', memberId: member.id, memberName: member.name, classId: cls.id, className: cls.name, trainerName: cls.trainerName, room: cls.room, branchName: cls.branchName, date: toIso(offsetDate(today, offset)), time: cls.time, bookingDate: toIso(offsetDate(today, offset - 4)), status: 'Attended' });
    });
    const cancelledClass = classes[2];
    bookings.push({ id: 'demo_bk_mem101_cancelled', demoRecord: true, gymId: 'gym_1', memberId: member.id, memberName: member.name, classId: cancelledClass.id, className: cancelledClass.name, trainerName: cancelledClass.trainerName, room: cancelledClass.room, branchName: cancelledClass.branchName, date: toIso(offsetDate(today, -3)), time: cancelledClass.time, bookingDate: toIso(offsetDate(today, -8)), status: 'Cancelled' });
    [1, 3, 6].forEach((offset, index) => {
      const cls = classes[(index + 3) % classes.length];
      const date = offsetDate(today, offset);
      cls.bookedCount += 1;
      bookings.push({ id: `demo_bk_mem101_upcoming_${index + 1}`, demoRecord: true, gymId: 'gym_1', memberId: member.id, memberName: member.name, classId: cls.id, className: cls.name, trainerName: cls.trainerName, room: cls.room, branchName: cls.branchName, date: toIso(date), time: cls.time, bookingDate: toIso(offsetDate(today, -2)), status: 'Confirmed' });
    });
    classes.forEach(cls => { cls.bookedCount = Math.min(cls.capacity, bookings.filter(item => item.classId === cls.id && item.status === 'Confirmed').length); });
    return { classes, bookings };
  }

  function makeWorkoutPlans(members, today) {
    return Array.from({ length: 72 }, (_, index) => {
      const member = members[index * 5];
      return {
        id: `demo_wp_${String(index + 1).padStart(3, '0')}`,
        demoRecord: true,
        gymId: 'gym_1',
        memberId: member.id,
        memberName: member.name,
        trainerName: `Coach ${trainerNames[index % trainerNames.length]}`,
        title: ['Strength & Conditioning 4-Day Split', 'Hypertrophy Upper/Lower Split', 'Beginner Full-Body Foundation'][index % 3],
        goal: ['Strength', 'Muscle Building', 'General Fitness'][index % 3],
        assignedDate: toIso(offsetDate(today, -((index % 28) + 1))),
        workoutSplit: 'Hypertrophy 4-Day Push/Pull/Legs Split',
        status: 'active',
        weeklySchedule: makeMemberSchedule(today)
      };
    });
  }

  function makeMemberSchedule(today) {
    const days = [
      ['Monday (Push)', [['Barbell Bench Press', 4, '8-10', '80 kg'], ['Incline Dumbbell Press', 3, '10-12', '26 kg'], ['Cable Fly', 3, '12-15', '18 kg'], ['Triceps Rope Pushdowns', 4, '12-15', '25 kg']]],
      ['Tuesday (Pull)', [['Lat Pulldown', 4, '8-10', '55 kg'], ['Seated Cable Row', 3, '10-12', '50 kg'], ['Face Pulls', 3, '12-15', '18 kg']]],
      ['Wednesday · Rest', []],
      ['Thursday (Legs)', [['Barbell Squat', 4, '8-10', '85 kg'], ['Romanian Deadlift', 3, '10-12', '70 kg'], ['Leg Press', 3, '12-15', '140 kg'], ['Walking Lunges', 3, '10 each', '16 kg']]],
      ['Friday (Upper)', [['Dumbbell Shoulder Press', 4, '8-10', '22 kg'], ['Chest-Supported Row', 3, '10-12', '45 kg'], ['Lateral Raises', 3, '12-15', '8 kg']]],
      ['Saturday (Full Body)', [['Barbell Bench Press', 4, '8-10', '82.5 kg'], ['Incline Dumbbell Press', 3, '10-12', '24 kg'], ['Standing Overhead Press', 3, '8-10', '45 kg'], ['Triceps Rope Pushdowns', 4, '12-15', '25 kg']]],
      ['Sunday · Rest', []]
    ];
    return days.map(([day, rawExercises], dayIndex) => ({ day, exercises: rawExercises.map(([name, sets, reps, weight], exerciseIndex) => ({ name, sets, reps, weight, restInterval: '90 sec', notes: exerciseIndex === 0 ? 'Maintain controlled form; leave 1-2 reps in reserve.' : 'Use a steady tempo and full range of motion.', completed: dayIndex === 5 && exerciseIndex === 0 })) }));
  }

  function makeMemberAttendance(member, today) {
    return [-8, -13, -18, -24, -29, -35, -41, -47, -54, -61, -68, -76, -83].map((offset, index) => {
      const date = offsetDate(today, offset);
      return { id: `demo_att_mem101_${toIso(date).replace(/-/g, '')}`, demoRecord: true, gymId: 'gym_1', branchId: index % 2 ? 'br_1' : 'br_2', branchName: index % 2 ? 'Andheri West' : 'Bandra Central', memberId: member.id, memberName: member.name, date: toIso(date), checkInTime: ['06:42 AM', '07:18 AM', '05:55 PM', '06:30 AM'][index % 4], checkOutTime: ['07:51 AM', '08:24 AM', '07:03 PM', '07:42 AM'][index % 4], method: ['QR Code', 'Keycard'][index % 2], status: 'Checked-Out' };
    });
  }

  function makeMemberProgress(member, today) {
    return [5, 35, 65, 95, 125, 155].map((daysAgo, index) => {
      const date = offsetDate(today, -daysAgo);
      const weightKg = [82.1, 82.8, 83.6, 84.1, 85.2, 86.0][index];
      return { id: `demo_progress_mem101_${index + 1}`, demoRecord: true, memberId: member.id, memberName: member.name, date: toIso(date), weightKg, weight: weightKg, bodyFatPct: [19.4, 19.8, 20.1, 20.5, 21.0, 21.4][index], chestCm: [101, 101.5, 102, 103, 104, 105][index], waistCm: [87, 88, 89, 90, 92, 94][index], armsCm: [34, 34, 33.8, 33.5, 33, 32.5][index], targetWeightKg: 75, notes: index === 0 ? 'Monthly progress review' : 'Fitness assessment' };
    });
  }

  function makeMemberNotifications(member, today) {
    const entries = [
      ['Workout ready for today', 'Coach Priya Nair added your Saturday full-body workout.', 'Workout', 0, true],
      ['Class booking confirmed', `Your place in ${classNames[3]} is confirmed.`, 'Bookings', -1, true],
      ['Monthly progress review', 'Your latest body progress check-in is available.', 'Progress', -2, false],
      ['Diwali Strength Challenge', 'Join the four-week member strength challenge this week.', 'Announcements', -3, false],
      ['Payment received', 'Your membership payment was received successfully.', 'Billing', -12, false],
      ['Studio maintenance notice', 'The spin room will be unavailable Sunday morning for servicing.', 'Announcements', -4, true]
    ];
    return entries.map(([title, message, category, offset, unread], index) => ({ id: `demo_notice_mem101_${index + 1}`, demoRecord: true, memberId: member.id, gymId: 'gym_1', title, message, category, date: toIso(offsetDate(today, offset)), time: '09:15 AM', unread, read: !unread }));
  }

  function makeGyms(today) {
    const gyms = [];
    const activePlanCounts = [6, 32, 30];
    const planInfo = [
      { name: 'Starter', price: 7500, planId: 'saas_starter' },
      { name: 'Growth', price: 15000, planId: 'saas_growth' },
      { name: 'Enterprise Pro', price: 25000, planId: 'saas_enterprise' }
    ];
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const next14 = index => offsetDate(todayStart, (index % 14) + 1);
    for (let index = 0; index < 85; index += 1) {
      const id = index === 0 ? 'gym_1' : `demo_gym_${String(index + 1).padStart(3, '0')}`;
      const name = index === 0 ? 'IronPulse Fitness Club' : `${gymPrefixes[Math.floor((index - 1) / gymSuffixes.length) % gymPrefixes.length]} ${gymSuffixes[(index - 1) % gymSuffixes.length]}`;
      const isActive = index < 72;
      const isSuspended = index >= 72 && index < 80;
      const status = isActive ? 'active' : isSuspended ? 'suspended' : 'pending';
      const subscriptionIndex = index < activePlanCounts[0] ? 0 : index < activePlanCounts[0] + activePlanCounts[1] ? 1 : index < 68 ? 2 : -1;
      const hasSubscription = isActive && subscriptionIndex >= 0;
      const plan = hasSubscription ? planInfo[subscriptionIndex] : planInfo[index % planInfo.length];
      const registrationMonthOffset = (index * 5) % 12;
      const registered = new Date(today.getFullYear(), today.getMonth() - registrationMonthOffset, Math.min(1 + ((index * 3) % 25), registrationMonthOffset === 0 ? today.getDate() : 28));
      const renewal = hasSubscription && index < 7 ? next14(index) : offsetDate(today, 45 + ((index * 17) % 340));
      const city = cities[index % cities.length];
      const owner = `${firstNames[(index * 3) % firstNames.length]} ${lastNames[(index * 7) % lastNames.length]}`;
      const memberCount = index === 0 ? 450 : 214 + (index <= 74 ? 1 : 0);
      gyms.push({
        id,
        demoRecord: true,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        logo: `https://images.unsplash.com/photo-${['1534438327276-14e5300c3a48', '1517838277536-f5f99be501cd', '1571902943202-507ec2618e8f', '1526506118085-60ce8714f8c5'][index % 4]}?w=100&h=100&fit=crop`,
        owner,
        email: `${owner.toLowerCase().replace(/\s+/g, '.')}@${name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.in`,
        phone: `+91 97${String(10000000 + index * 119).slice(-8)}`,
        address: `${24 + index} ${['MG Road', 'Park Street', 'Lake View Road', 'Central Avenue'][index % 4]}`,
        city: `${city}${['', ', MH', ', KA', ', TS', ', DL'][index % 5]}`,
        planId: plan.planId,
        planName: plan.name,
        status,
        registrationDate: toIso(registered),
        renewalDate: toIso(renewal),
        subscriptionStatus: hasSubscription ? 'active' : isActive ? 'complimentary' : status,
        expiringSoon: hasSubscription && index < 7,
        mrr: hasSubscription ? plan.price : 0,
        membersCount: memberCount,
        branchesCount: 1 + (index % 5)
      });
    }
    return gyms;
  }

  function makePlatformBilling(gyms, today) {
    const subscribed = gyms.filter(gym => gym.subscriptionStatus === 'active');
    const targetByMonth = [1050000, 1100000, 1150000, 1200000, 1240000, 1275000];
    const billings = [];
    const planPrices = { Starter: 7500, Growth: 15000, 'Enterprise Pro': 25000 };
    for (let monthOffset = 5; monthOffset >= 0; monthOffset -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
      const target = targetByMonth[5 - monthOffset];
      let assigned = 0;
      subscribed.forEach((gym, index) => {
        const baseTotal = subscribed.reduce((sum, item) => sum + (planPrices[item.planName] || 0), 0);
        const base = planPrices[gym.planName] || 0;
        const amount = index === subscribed.length - 1 ? target - assigned : Math.round(target * base / baseTotal);
        assigned += amount;
        const paidDate = new Date(date.getFullYear(), date.getMonth(), Math.min(3 + (index * 5) % 24, monthOffset === 0 ? today.getDate() : 27));
        billings.push({
          id: `demo_saas_paid_${monthOffset}_${String(index + 1).padStart(3, '0')}`,
          demoRecord: true,
          invoiceNo: `GF-${monthKey(date).replace('-', '')}-${String(index + 1).padStart(4, '0')}`,
          gymId: gym.id,
          gymName: gym.name,
          planName: gym.planName,
          amount: money(amount),
          date: toIso(paidDate),
          method: ['UPI AutoPay', 'Credit Card', 'Net Banking'][index % 3],
          status: 'Paid',
          refundStatus: 'None'
        });
      });
    }
    const pendingAmounts = [25000, 25000, 25000, 15000, 15000, 10000, 10000, 10000, 10000];
    const nonPaying = gyms.filter(gym => gym.subscriptionStatus !== 'active');
    pendingAmounts.forEach((amount, index) => {
      const gym = gyms[(index * 7 + 4) % gyms.length];
      billings.push({
        id: `demo_saas_pending_${index + 1}`,
        demoRecord: true,
        invoiceNo: `GF-PEND-${String(index + 1).padStart(4, '0')}`,
        gymId: gym.id,
        gymName: gym.name,
        planName: gym.planName,
        amount,
        date: toIso(offsetDate(today, -((index % 7) + 1))),
        dueDate: toIso(offsetDate(today, (index % 10) + 1)),
        method: 'Bank Transfer',
        status: 'Pending',
        refundStatus: 'None'
      });
    });
    [32000, 18000].forEach((amount, index) => {
      const gym = nonPaying[index];
      billings.push({
        id: `demo_saas_failed_${index + 1}`,
        demoRecord: true,
        invoiceNo: `GF-FAIL-${String(index + 1).padStart(4, '0')}`,
        gymId: gym.id,
        gymName: gym.name,
        planName: gym.planName,
        amount,
        date: toIso(offsetDate(today, -(index + 2))),
        method: 'Credit Card',
        status: 'Failed',
        refundStatus: 'None'
      });
    });
    return billings;
  }

  function makeAuditLogs(gyms, today) {
    const events = [
      ['SUBSCRIPTION_RENEWED', 'Growth plan renewed', 'Billing System'],
      ['GYM_APPROVED', 'New gym registration approved', 'Platform Admin'],
      ['PAYMENT_RECEIVED', 'Monthly subscription payment received', 'Billing System'],
      ['PLAN_CHANGED', 'Gym subscription upgraded to Enterprise Pro', 'Platform Admin'],
      ['GYM_SUSPENDED', 'Gym account suspended after payment review', 'Risk Operations'],
      ['GYM_REGISTERED', 'New gym organization registered', 'Onboarding'],
      ['INVOICE_ISSUED', 'Monthly platform invoice issued', 'Billing System']
    ];
    return Array.from({ length: 28 }, (_, index) => {
      const event = events[index % events.length];
      const gym = gyms[(index * 11) % gyms.length];
      const timestampDate = offsetDate(today, -(index % 18));
      return {
        id: `demo_log_${String(index + 1).padStart(3, '0')}`,
        demoRecord: true,
        timestamp: `${toIso(timestampDate)} ${pad(8 + index % 10)}:${pad((index * 13) % 60)}:${pad((index * 17) % 60)}`,
        actor: event[2],
        role: 'Super Admin',
        action: event[0],
        resource: `${gym.name} — ${event[1]}`,
        ip: `10.0.${index % 10}.${index + 10}`,
        result: 'Success'
      };
    });
  }

  function makeAnnouncements(today) {
    return [
      { id: 'demo_ann_gym_1', demoRecord: true, scope: 'gym', gymId: 'gym_1', target: 'All Members', title: 'Diwali Strength Challenge Starts This Week', content: 'Join our four-week strength challenge with weekly coaching check-ins and member rewards.', date: toIso(offsetDate(today, -2)), status: 'Published', author: 'IronPulse Fitness Team' },
      { id: 'demo_ann_gym_2', demoRecord: true, scope: 'gym', gymId: 'gym_1', target: 'All Members', title: 'New Functional Training Sessions Added', content: 'Small-group conditioning sessions are now available on weekday evenings. Book your place at reception.', date: toIso(offsetDate(today, -5)), status: 'Published', author: 'Coach Priya Nair' },
      { id: 'demo_ann_gym_3', demoRecord: true, scope: 'gym', gymId: 'gym_1', target: 'All Members', title: 'Member Referral Offer', content: 'Refer a friend this month and both members receive a complimentary fitness assessment.', date: toIso(offsetDate(today, -7)), status: 'Published', author: 'IronPulse Member Services' },
      { id: 'demo_ann_gym_4', demoRecord: true, scope: 'gym', gymId: 'gym_1', target: 'All Members', title: 'Spin Studio Maintenance', content: 'The spin studio will be closed Sunday from 8:00 AM to 11:00 AM for scheduled equipment servicing.', date: toIso(offsetDate(today, -4)), status: 'Published', author: 'IronPulse Operations' },
      { id: 'demo_ann_platform_1', demoRecord: true, scope: 'platform', target: 'All Gym Admins', title: 'Platform Billing Statements Ready', content: 'Monthly subscription statements are available in the platform billing workspace.', date: toIso(offsetDate(today, -1)), status: 'Published', author: 'GymFlow Billing' }
    ];
  }

  function makeDatabase() {
    const today = new Date();
    const base = JSON.parse(JSON.stringify(INITIAL_MOCK_DATA));
    const members = makeMembers(today);
    const gyms = makeGyms(today);
    const gymPayments = makeGymPayments(members, today);
    const attendance = [...makeAttendance(members, today), ...makeMemberAttendance(members[0], today)];
    const { classes, bookings } = makeClasses(today, members);
    const trainers = trainerNames.map((name, index) => ({
      id: `demo_tr_${String(index + 1).padStart(2, '0')}`,
      demoRecord: true,
      gymId: 'gym_1',
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@ironpulse.in`,
      phone: `+91 98${String(12345678 + index * 213).slice(-8)}`,
      specialization: ['Strength & Conditioning', 'Weight Management', 'Yoga & Mobility'][index % 3],
      experience: `${4 + index % 9} years`,
      assignedClasses: [classNames[index % classNames.length]],
      availability: 'Mon - Sat, 6 AM - 8 PM',
      status: 'active',
      rating: 4.6 + (index % 5) * 0.1,
      clientCount: 22 + (index * 3) % 25
    }));
    const plans = [
      { id: 'gplan_1', demoRecord: true, gymId: 'gym_1', name: 'Standard Monthly', duration: '1 Month', durationDays: 30, price: 2500, joiningFee: 500, benefits: ['Gym floor access', 'Fitness assessment'], status: 'active' },
      { id: 'gplan_2', demoRecord: true, gymId: 'gym_1', name: 'Quarterly Fitness Pass', duration: '3 Months', durationDays: 90, price: 6500, joiningFee: 0, benefits: ['Gym and group class access', 'Monthly fitness assessment'], status: 'active' },
      { id: 'gplan_3', demoRecord: true, gymId: 'gym_1', name: 'Semi-Annual Club', duration: '6 Months', durationDays: 180, price: 12000, joiningFee: 0, benefits: ['Two-branch access', 'Group classes', 'Locker service'], status: 'active' },
      { id: 'gplan_4', demoRecord: true, gymId: 'gym_1', name: 'Annual VIP All-Access', duration: '12 Months', durationDays: 365, price: 24000, joiningFee: 0, benefits: ['All branch access', 'Monthly personal training', 'Nutrition consultation'], status: 'active' },
      { id: 'gplan_5', demoRecord: true, gymId: 'gym_1', name: 'Personal Training Elite', duration: '3 Months', durationDays: 90, price: 18500, joiningFee: 0, benefits: ['12 PT sessions', 'Nutrition plan', 'Progress review'], status: 'active' }
    ];
    const revenueMonths = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() - (5 - index), 1);
      return { month: monthNames[date.getMonth()], key: monthKey(date), revenue: [350000, 380000, 415000, 440000, 465000, 485000][index] };
    });
    const pendingPaymentsTotal = gymPayments.filter(payment => payment.status === 'Pending').reduce((sum, payment) => sum + payment.amount, 0);
    const currentMonthRevenue = gymPayments.filter(payment => payment.status === 'Paid' && payment.date.slice(0, 7) === monthKey(today)).reduce((sum, payment) => sum + payment.amount, 0);
    gyms[0].membersCount = members.length;
    gyms[0].name = 'IronPulse Fitness Club';
    gyms[0].owner = 'Marcus Vance';
    gyms[0].city = 'Mumbai, MH';
    gyms[0].planName = 'Starter';
    gyms[0].planId = 'saas_starter';
    gyms[0].mrr = 7500;
    gyms[0].branchesCount = 2;
    const platformBilling = makePlatformBilling(gyms, today);
    const platformMemberCount = gyms.reduce((sum, gym) => sum + gym.membersCount, 0);
    const monthlyPlatformRevenue = platformBilling.filter(item => item.status === 'Paid' && item.date.slice(0, 7) === monthKey(today)).reduce((sum, item) => sum + item.amount, 0);
    const pendingPlatformPayments = platformBilling.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);
    return {
      ...base,
      _dashboardDemoVersion: demoVersion,
      _dashboardDemoGeneratedAt: toIso(today),
      gyms,
      members,
      gymPlans: plans,
      payments: gymPayments,
      attendance,
      trainers,
      classes,
      classBookings: bookings,
      workoutPlans: makeWorkoutPlans(members, today),
      progressRecords: makeMemberProgress(members[0], today),
      memberNotifications: makeMemberNotifications(members[0], today),
      leads: Array.from({ length: 32 }, (_, index) => ({ id: `demo_lead_${index + 1}`, demoRecord: true, gymId: 'gym_1', name: `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]}`, source: ['Website', 'Referral', 'Walk-in'][index % 3], status: index % 4 ? 'New' : 'Contacted', createdAt: toIso(offsetDate(today, -(index % 28))) })),
      maintenance: [
        { id: 'demo_maint_1', gymId: 'gym_1', title: 'Treadmill belt inspection', priority: 'High', status: 'In Progress', dueDate: toIso(offsetDate(today, 1)) },
        { id: 'demo_maint_2', gymId: 'gym_1', title: 'Studio speaker service', priority: 'Medium', status: 'In Progress', dueDate: toIso(offsetDate(today, 4)) },
        { id: 'demo_maint_3', gymId: 'gym_1', title: 'Locker room shower check', priority: 'Low', status: 'In Progress', dueDate: toIso(offsetDate(today, 6)) }
      ],
      platformBilling,
      auditLogs: makeAuditLogs(gyms, today),
      announcements: makeAnnouncements(today),
      supportTickets: [
        { id: 'demo_ticket_1', demoRecord: true, scope: 'platform', gymId: 'gym_1', subject: 'Invoice payment confirmation', status: 'Open', priority: 'Normal', createdAt: toIso(offsetDate(today, -1)) },
        { id: 'demo_ticket_2', demoRecord: true, scope: 'platform', gymId: 'demo_gym_014', subject: 'Branch access configuration', status: 'Open', priority: 'High', createdAt: toIso(offsetDate(today, -2)) },
        { id: 'demo_ticket_3', demoRecord: true, scope: 'platform', gymId: 'demo_gym_027', subject: 'Subscription plan change', status: 'Open', priority: 'Normal', createdAt: toIso(offsetDate(today, -3)) },
        { id: 'demo_member_ticket_1', demoRecord: true, gymId: 'gym_1', memberId: members[0].id, submittedBy: members[0].name, email: members[0].email, subject: 'Request to review my training split', category: 'Workout Plan', description: 'Could I get advice on adjusting my weekly training volume?', status: 'Open', priority: 'Normal', createdAt: toIso(offsetDate(today, -1)), replies: [] },
        { id: 'demo_member_ticket_2', demoRecord: true, gymId: 'gym_1', memberId: members[0].id, submittedBy: members[0].name, email: members[0].email, subject: 'Membership payment receipt', category: 'Billing', description: 'Please resend my latest membership receipt.', status: 'In Progress', priority: 'Normal', createdAt: toIso(offsetDate(today, -4)), replies: [{ author: 'Riya Shah', role: 'Support', message: 'We are checking the billing record and will share the receipt shortly.', createdAt: toIso(offsetDate(today, -3)) }] },
        { id: 'demo_member_ticket_3', demoRecord: true, gymId: 'gym_1', memberId: members[0].id, submittedBy: members[0].name, email: members[0].email, subject: 'Update emergency contact', category: 'Profile', description: 'Please confirm the emergency contact update on my profile.', status: 'Resolved', priority: 'Low', createdAt: toIso(offsetDate(today, -12)), replies: [{ author: 'Riya Shah', role: 'Support', message: 'Your profile has been updated successfully.', createdAt: toIso(offsetDate(today, -11)) }] }
      ],
      dashboardDemoSummary: {
        gymAdmin: {
          totalMembers: members.length,
          activeMembers: members.filter(member => member.status === 'Active').length,
          newMembersThisMonth: members.filter(member => member.startDate.slice(0, 7) === monthKey(today)).length,
          expiredMembers: members.filter(member => member.status === 'Expired').length,
          todayAttendance: attendance.filter(item => item.date === toIso(today)).length,
          monthlyRevenue: currentMonthRevenue,
          pendingPayments: pendingPaymentsTotal,
          trainers: trainers.length,
          workoutPlans: 72,
          revenueMonths
        },
        superAdmin: {
          totalGyms: gyms.length,
          activeGyms: gyms.filter(gym => gym.status === 'active').length,
          suspendedGyms: gyms.filter(gym => gym.status === 'suspended').length,
          pendingApprovals: gyms.filter(gym => gym.status === 'pending').length,
          totalMembers: platformMemberCount,
          activeSubscriptions: gyms.filter(gym => gym.subscriptionStatus === 'active').length,
          expiringSubscriptions: gyms.filter(gym => gym.expiringSoon).length,
          monthlyRevenue: monthlyPlatformRevenue,
          pendingPayments: pendingPlatformPayments
        }
      }
    };
  }

  window.GymFlowDashboardDemoData = {
    version: demoVersion,
    seed() {
      if (!window.GymFlowDB?.isDemoMode?.()) return false;
      const currentVersion = Number(window.GymFlowDB._getDb?.()._dashboardDemoVersion) || 0;
      if (currentVersion >= demoVersion) return false;
      return window.GymFlowDB.seedDemoData(makeDatabase());
    },
    isEnabled() {
      return Boolean(window.GymFlowDB?.isDemoMode?.());
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.GymFlowDashboardDemoData.seed(), { once: true });
  } else {
    window.GymFlowDashboardDemoData.seed();
  }
})();
