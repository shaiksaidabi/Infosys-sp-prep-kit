import { useEffect, useMemo, useRef, useState } from "react";
import "./style.css";
import  Intro from "./Intro";
import Auth from "./Auth";
import { supabase } from "./supabaseClient";
const topics = [
  {
    name: "Arrays",
    icon: "▦",
    subtopics: [
      "Array Traversal",
      "Frequency Counting",
      "HashMap with Arrays",
      "Prefix Sum",
      "Kadane's Algorithm",
      "Two Pointer",
      "Sliding Window",
      "Sorting",
      "Subarrays",
      "Array Rotation",
      "Merge Intervals",
      "2D Arrays / Matrix",
      "Binary Search on Arrays",
      "Time & Space Complexity"
    ]
  },
  {
    name: "Strings",
    icon: "Aa",
    subtopics: [
      "String Traversal",
      "Character Frequency",
      "Palindrome",
      "Anagram",
      "String Hashing",
      "Two Pointer",
      "Sliding Window",
      "String Parsing",
      "Pattern Matching"
    ]
  },
  {
    name: "Hashing",
    icon: "#",
    subtopics: [
      "HashMap",
      "HashSet",
      "Frequency Map",
      "Duplicate Detection",
      "Two Sum Pattern",
      "Grouping",
      "Prefix Sum + HashMap"
    ]
  },
  {
    name: "Linked List",
    icon: "↔",
    subtopics: [
      "Traversal",
      "Reverse Linked List",
      "Fast & Slow Pointer",
      "Cycle Detection",
      "Merge Lists",
      "Remove Node",
      "Reorder List",
      "Merge K Lists"
    ]
  },
  {
    name: "Stack & Queue",
    icon: "▤",
    subtopics: [
      "Stack",
      "Queue",
      "Deque",
      "Monotonic Stack",
      "Valid Parentheses",
      "Next Greater Element",
      "Sliding Window Maximum"
    ]
  },
  {
    name: "Binary Search",
    icon: "⌕",
    subtopics: [
      "Classic Binary Search",
      "Lower Bound",
      "Upper Bound",
      "Search Rotated Array",
      "Binary Search on Answer",
      "First / Last Position"
    ]
  },
  {
    name: "Trees",
    icon: "⌁",
    subtopics: [
      "Tree Traversal",
      "DFS",
      "BFS",
      "Level Order",
      "Height / Depth",
      "Binary Tree",
      "BST",
      "Lowest Common Ancestor",
      "Kth Smallest",
      "Tree Recursion"
    ]
  },
  {
    name: "Graphs",
    icon: "◇",
    subtopics: [
      "Graph Representation",
      "BFS",
      "DFS",
      "Connected Components",
      "Cycle Detection",
      "Topological Sort",
      "Shortest Path",
      "Dijkstra",
      "Grid Graphs"
    ]
  },
  {
    name: "Greedy",
    icon: "⚡",
    subtopics: [
      "Greedy Choice",
      "Sorting + Greedy",
      "Intervals",
      "Activity Selection",
      "Minimum Platforms",
      "Jump Game",
      "Optimization Problems"
    ]
  },
  {
    name: "Dynamic Programming",
    icon: "DP",
    subtopics: [
      "DP State",
      "Recursion + Memoization",
      "Tabulation",
      "1D DP",
      "2D DP",
      "Grid DP",
      "Knapsack",
      "LIS",
      "LCS",
      "Coin Change",
      "State Transition",
      "DP Optimization"
    ]
  },
  {
    name: "Backtracking",
    icon: "↳",
    subtopics: [
      "Recursion",
      "Decision Tree",
      "Subsets",
      "Permutations",
      "Combination Sum",
      "N-Queens",
      "Word Search"
    ]
  },
  {
    name: "Bit Manipulation",
    icon: "01",
    subtopics: [
      "Bitwise AND",
      "Bitwise OR",
      "XOR",
      "Left / Right Shift",
      "Counting Bits",
      "Single Number",
      "Missing Number"
    ]
  },
  {
    name: "Advanced Data Structures",
    icon: "◆",
    subtopics: [
      "Heap / Priority Queue",
      "Trie",
      "Segment Tree",
      "Fenwick Tree",
      "Disjoint Set Union",
      "Top K Problems"
    ]
  }
];
const problems = [
  {
    id: 1,
    name: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    id: 2,
    name: "Contains Duplicate",
    topic: "Hashing",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/contains-duplicate/"
  },
  {
    id: 3,
    name: "Valid Anagram",
    topic: "Hashing",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-anagram/"
  },
  {
    id: 4,
    name: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    id: 5,
    name: "Maximum Subarray",
    topic: "Arrays",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    id: 6,
    name: "Product of Array Except Self",
    topic: "Arrays",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/product-of-array-except-self/"
  },
  {
    id: 7,
    name: "3Sum",
    topic: "Two Pointers",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/3sum/"
  },
  {
    id: 8,
    name: "Container With Most Water",
    topic: "Two Pointers",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/container-with-most-water/"
  },
  {
    id: 9,
    name: "Valid Palindrome",
    topic: "Two Pointers",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-palindrome/"
  },
  {
    id: 10,
    name: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    id: 11,
    name: "Longest Repeating Character Replacement",
    topic: "Sliding Window",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-repeating-character-replacement/"
  },
  {
    id: 12,
    name: "Minimum Window Substring",
    topic: "Sliding Window",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/minimum-window-substring/"
  },
  {
    id: 13,
    name: "Group Anagrams",
    topic: "Hashing",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/group-anagrams/"
  },
  {
    id: 14,
    name: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    id: 15,
    name: "Merge Intervals",
    topic: "Greedy",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/merge-intervals/"
  },
  {
    id: 16,
    name: "Insert Interval",
    topic: "Greedy",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/insert-interval/"
  },
  {
    id: 17,
    name: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    id: 18,
    name: "Linked List Cycle",
    topic: "Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/linked-list-cycle/"
  },
  {
    id: 19,
    name: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    id: 20,
    name: "Remove Nth Node From End of List",
    topic: "Linked List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  },
  {
    id: 21,
    name: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-search/"
  },
  {
    id: 22,
    name: "Search in Rotated Sorted Array",
    topic: "Binary Search",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },
  {
    id: 23,
    name: "Missing Number",
    topic: "Bit Manipulation",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/missing-number/"
  },
  {
    id: 24,
    name: "Maximum Depth of Binary Tree",
    topic: "Trees",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  },
  {
    id: 25,
    name: "Invert Binary Tree",
    topic: "Trees",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/invert-binary-tree/"
  },
  {
    id: 26,
    name: "Binary Tree Level Order Traversal",
    topic: "Trees",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    id: 27,
    name: "Validate Binary Search Tree",
    topic: "BST",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/validate-binary-search-tree/"
  },
  {
    id: 28,
    name: "Kth Smallest Element in a BST",
    topic: "BST",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
  },
  {
    id: 29,
    name: "Number of Islands",
    topic: "Graphs",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    id: 30,
    name: "Clone Graph",
    topic: "Graphs",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/clone-graph/"
  },
  {
    id: 31,
    name: "Course Schedule",
    topic: "Graphs",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/course-schedule/"
  },
  {
    id: 32,
    name: "Climbing Stairs",
    topic: "1D Dynamic Programming",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    id: 33,
    name: "House Robber",
    topic: "1D Dynamic Programming",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/house-robber/"
  },
  {
    id: 34,
    name: "Coin Change",
    topic: "1D Dynamic Programming",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/coin-change/"
  },
  {
    id: 35,
    name: "Longest Increasing Subsequence",
    topic: "1D Dynamic Programming",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-increasing-subsequence/"
  },
  {
    id: 36,
    name: "Word Break",
    topic: "1D Dynamic Programming",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/word-break/"
  },
  {
    id: 37,
    name: "Unique Paths",
    topic: "2D Dynamic Programming",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/unique-paths/"
  },
  {
    id: 38,
    name: "Combination Sum",
    topic: "Backtracking",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/combination-sum/"
  },
  {
    id: 39,
    name: "Word Search",
    topic: "Backtracking",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/word-search/"
  },
  {
    id: 40,
    name: "Jump Game",
    topic: "Greedy",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/jump-game/"
  }
];

const schedule = [
  ["Day 1", "Arrays + Hashing", "Two Sum, Contains Duplicate, Valid Anagram"],
  ["Day 2", "Arrays", "Best Time to Buy/Sell Stock, Maximum Subarray"],
  ["Day 3", "Arrays + Prefix Sum", "Product Except Self + subarray patterns"],
  ["Day 4", "Two Pointers", "3Sum, Container With Most Water, Palindrome"],
  ["Day 5", "Sliding Window", "Longest Substring + Character Replacement"],
  ["Day 6", "Strings", "Minimum Window + Group Anagrams"],
  ["Day 7", "Revision", "Redo mistakes + timed practice"],
  ["Day 8", "Stack + Queue", "Valid Parentheses + stack patterns"],
  ["Day 9", "Intervals + Greedy", "Merge, Insert, Non-overlapping Intervals"],
  ["Day 10", "Revision", "Days 1–9 + coding test"],
  ["Day 11", "Linked List", "Reverse, Cycle, Merge Lists"],
  ["Day 12", "Linked List", "Remove Nth, Reorder, Merge K"],
  ["Day 13", "Binary Search", "Rotated Array + Binary Search patterns"],
  ["Day 14", "Bit Manipulation / XOR", "Bits, XOR, Missing Number"],
  ["Day 15", "Revision", "Linked List + Binary + Bit"],
  ["Day 16", "Trees", "Depth, Same Tree, Invert Tree"],
  ["Day 17", "Trees", "Level Order + Path Sum"],
  ["Day 18", "BST", "Validate BST + Kth Smallest"],
  ["Day 19", "Trees + Trie", "LCA + Trie + Word Search"],
  ["Day 20", "Tree Revision", "Timed Tree problems"],
  ["Day 21", "Graphs", "Number of Islands + Clone Graph"],
  ["Day 22", "BFS / DFS", "Course Schedule + Pacific Atlantic"],
  ["Day 23", "1D DP", "Climbing Stairs + House Robber"],
  ["Day 24", "DP", "Coin Change + LIS + LCS"],
  ["Day 25", "DP + Backtracking", "Word Break + Combination Sum + Unique Paths"],
  ["Day 26", "Greedy + DP", "Decode Ways + Jump Game"],
  ["Day 27", "2D / Grid DP", "Matrix + Spiral + Rotate Image"],
  ["Day 28", "Backtracking + Mixed", "Word Search + Top K + Median"],
  ["Day 29", "Blind 75 Revision", "Redo difficult + previously wrong problems"],
  ["Day 30", "FINAL MOCK", "Full timed coding test + final revision"]
];

const resources = {
  "Arrays + Hashing": {
    learn: "https://www.geeksforgeeks.org/dsa/arrays/",
    java: "https://www.w3schools.com/java/java_arrays.asp",
    youtube: "https://www.youtube.com/results?search_query=arrays+hashing+dsa+java"
  },

  Arrays: {
    learn: "https://www.geeksforgeeks.org/dsa/arrays/",
    java: "https://www.w3schools.com/java/java_arrays.asp",
    youtube: "https://www.youtube.com/results?search_query=arrays+dsa+java"
  },

  "Two Pointers": {
    learn: "https://www.geeksforgeeks.org/dsa/two-pointers-technique/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=two+pointers+dsa+java"
  },

  "Sliding Window": {
    learn: "https://www.geeksforgeeks.org/dsa/window-sliding-technique/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=sliding+window+dsa+java"
  },

  Strings: {
    learn: "https://www.geeksforgeeks.org/dsa/string-data-structure/",
    java: "https://www.w3schools.com/java/java_strings.asp",
    youtube: "https://www.youtube.com/results?search_query=strings+dsa+java"
  },

  "Stack + Queue": {
    learn: "https://www.geeksforgeeks.org/stack-data-structure/",
    java: "https://www.w3schools.com/java/java_stack.asp",
    youtube: "https://www.youtube.com/results?search_query=stack+queue+dsa+java"
  },

  "Intervals + Greedy": {
    learn: "https://www.geeksforgeeks.org/dsa/greedy-algorithms/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=intervals+greedy+dsa+java"
  },

  "Linked List": {
    learn: "https://www.geeksforgeeks.org/data-structures/linked-list/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=linked+list+dsa+java"
  },

  "Binary Search": {
    learn: "https://www.geeksforgeeks.org/dsa/binary-search/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=binary+search+dsa+java"
  },

  "Bit Manipulation / XOR": {
    learn: "https://www.geeksforgeeks.org/bitwise-operators-in-java/",
    java: "https://www.w3schools.com/java/java_operators.asp",
    youtube: "https://www.youtube.com/results?search_query=bit+manipulation+xor+dsa+java"
  },

  Trees: {
    learn: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=trees+dsa+java"
  },

  BST: {
    learn: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=BST+dsa+java"
  },

  "Trees + Trie": {
    learn: "https://www.geeksforgeeks.org/trie-insert-and-search/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=trie+tree+dsa+java"
  },

  "Tree Revision": {
    learn: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=tree+dsa+revision+java"
  },

  Graphs: {
    learn: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=graphs+dsa+java"
  },

  "BFS / DFS": {
    learn: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=BFS+DFS+dsa+java"
  },

  "1D DP": {
    learn: "https://www.geeksforgeeks.org/dynamic-programming/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=1D+dynamic+programming+dsa+java"
  },

  DP: {
    learn: "https://www.geeksforgeeks.org/dynamic-programming/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=dynamic+programming+dsa+java"
  },

  "DP + Backtracking": {
    learn: "https://www.geeksforgeeks.org/dynamic-programming/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=DP+backtracking+dsa+java"
  },

  "Greedy + DP": {
    learn: "https://www.geeksforgeeks.org/dynamic-programming/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=greedy+DP+dsa+java"
  },

  "2D / Grid DP": {
    learn: "https://www.geeksforgeeks.org/dynamic-programming/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=2D+grid+DP+dsa+java"
  },

  "Backtracking + Mixed": {
    learn: "https://www.geeksforgeeks.org/backtracking-algorithms/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=backtracking+dsa+java"
  },

  "Blind 75 Revision": {
    learn: "https://www.geeksforgeeks.org/dsa/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=Blind+75+revision+java"
  },

  "FINAL MOCK": {
    learn: "https://www.geeksforgeeks.org/dsa/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=DSA+mock+test+java"
  },

  Revision: {
    learn: "https://www.geeksforgeeks.org/dsa/",
    java: "https://www.w3schools.com/java/",
    youtube: "https://www.youtube.com/results?search_query=DSA+revision+java"
  }
};
function App() {
  const [user, setUser] = useState(null);
const [authLoading, setAuthLoading] = useState(true);

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    setUser(data.session?.user ?? null);
    setAuthLoading(false);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
  const [showIntro, setShowIntro] = useState(false);
  const [section, setSection] = useState("Dashboard");

  const [problemStatus, setProblemStatus] = useState({});
  const [notes, setNotes] = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [studySeconds, setStudySeconds] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [progressLoading, setProgressLoading] = useState(true);

  const progressLoaded = useRef(false);
  const studySecondsRef = useRef(3600);

  useEffect(() => {
    studySecondsRef.current = studySeconds;
  }, [studySeconds]);

  /* =========================
     SUPABASE USER PROGRESS
  ========================= */

  useEffect(() => {
    let cancelled = false;

    const loadProgress = async () => {
      if (!user) {
        progressLoaded.current = false;
        setProgressLoading(false);
        return;
      }

      setProgressLoading(true);
      progressLoaded.current = false;

      // Reset to the default state while the selected user's data loads.
      setProblemStatus({});
      setNotes({});
      setCompletedDays([]);
      setStudySeconds(3600);
      studySecondsRef.current = 3600;

      const { data, error } = await supabase
        .from("user_progress")
        .select("problem_status, problem_notes, completed_days, study_seconds")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Failed to load user progress:", error);
        setProgressLoading(false);
        return;
      }

      if (!data) {
        const defaults = {
          user_id: user.id,
          problem_status: {},
          problem_notes: {},
          completed_days: [],
          study_seconds: 3600,
        };

        const { error: insertError } = await supabase
          .from("user_progress")
          .upsert(defaults, { onConflict: "user_id" });

        if (insertError) {
          console.error("Failed to create user progress:", insertError);
        }
      } else {
        setProblemStatus(data.problem_status || {});
        setNotes(data.problem_notes || {});
        setCompletedDays(
          Array.isArray(data.completed_days) && data.completed_days.length
            ? data.completed_days
            : []
        );
        setStudySeconds(Number(data.study_seconds ?? 3600));
        studySecondsRef.current = Number(data.study_seconds ?? 3600);
      }

      progressLoaded.current = true;
      setProgressLoading(false);
    };

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const saveProgress = async (overrideStudySeconds = null) => {
    if (!user || !progressLoaded.current) return;

    const payload = {
      user_id: user.id,
      problem_status: problemStatus,
      problem_notes: notes,
      completed_days: completedDays,
      study_seconds:
        overrideStudySeconds === null
          ? studySecondsRef.current
          : overrideStudySeconds,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("user_progress")
      .upsert(payload, { onConflict: "user_id" });

    if (error) {
      console.error("Failed to save user progress:", error);
    }
  };

  // Save normal progress shortly after a change.
  useEffect(() => {
    if (!user || !progressLoaded.current) return;

    const timeout = setTimeout(() => {
      saveProgress();
    }, 700);

    return () => clearTimeout(timeout);
  }, [problemStatus, notes, completedDays, user]);

  // Save timer progress every 15 seconds while the timer is running.
  useEffect(() => {
    if (!user || !progressLoaded.current || !timerRunning) return;

    const interval = setInterval(() => {
      saveProgress(studySecondsRef.current);
    }, 15000);

    return () => clearInterval(interval);
  }, [user, timerRunning]);


  /* =========================
     STUDY TIMER
  ========================= */

  useEffect(() => {
    if (!timerRunning) return;

    const timer = setInterval(() => {
      setStudySeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRunning]);

  /* =========================
     CALCULATIONS
  ========================= */

  const solved = Object.values(problemStatus).filter(
    (status) => status === "Solved"
  ).length;

  const attempted = Object.values(problemStatus).filter(
    (status) => status === "Attempted"
  ).length;

  const overall = Math.round(
    (solved / problems.length) * 100
  );
const daysCompleted = completedDays.length;
  const completedPercentage = useMemo(() => {
    return Math.round(
      (completedDays.length / schedule.length) * 100
    );
  }, [completedDays]);
  

  /* =========================
     COUNTDOWN
  ========================= */


  /* =========================
     HELPERS
  ========================= */

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const toggleProblem = (id, value) => {
    setProblemStatus((previous) => ({
      ...previous,
      [id]: value
    }));
  };

  const toggleDay = (index) => {
    setCompletedDays((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const handleLogout = async () => {
    await saveProgress(studySecondsRef.current);
    await supabase.auth.signOut();
    setUser(null);
  };

  /* =========================
     UI
  ========================= */
if (authLoading) {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Loading...</h1>
      </div>
    </div>
  );
}

const handleLogin = (loggedInUser) => {
  setUser(loggedInUser);
  setSection("Dashboard");
  setShowIntro(true);
};

if (!user) {
  return <Auth onLogin={handleLogin} />;
}
if (progressLoading) {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-logo">INFOSYS</div>
        <h1>Loading your progress...</h1>
        <p className="auth-subtitle">Preparing your personal dashboard</p>
      </div>
    </div>
  );
}

  return (
 <>
    {showIntro && (
      <Intro
        day={Math.max(1, completedDays.length)}
        onFinish={() => setShowIntro(false)}
      />
    )}
    <div className="app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-mark">
            ⚡
          </div>

          <div>
            <h2>SP / DSE</h2>
            <span>Prep Tracker</span>
          </div>

        </div>

        <div className="nav-label">
          PREPARATION
        </div>

        {[
          ["Dashboard", "⌂"],
          ["Today's Schedule", "◷"],
          ["Topics", "▦"],
          ["Infosys Questions","▣"],
          ["Problems", "◆"],
          ["Study Timer", "◉"],
          ["Progress", "↗"],
        
        ].map(([item, icon]) => (
          <button
            key={item}
            className={
              section === item ? "active" : ""
            }
            onClick={() => setSection(item)}
          >
            <span className="nav-icon">
              {icon}
            </span>

            <span>
              {item}
            </span>
          </button>
        ))}

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="nav-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main">

        {/* TOPBAR */}

        <div className="topbar">

          <div>

            <div className="eyebrow">
              INFOSYS SP / DSE PREPARATION
            </div>

            <h1>
              {section}
            </h1>

            <p>
              30-day focused preparation workspace
            </p>

          </div>
        <div className="topbar">
  
</div>

        </div>


        {/* ==================================================
            DASHBOARD
        ================================================== */}

      {section === "Dashboard" && (
  <div className="dashboard-page">

    {/* HERO */}
    <div className="dashboard-hero">
      <div>
        <span className="hero-label">INFOSYS SP / DSE PREP KIT</span>
        <h2>Build consistency. Crack the coding round.</h2>
        <p>
          A focused 30-day workspace for DSA, coding practice,
          revision and mock tests.
        </p>
      </div>

      <div className="hero-badge">
        <span>DAY</span>
        <strong>{completedDays.length}</strong>
        <small>/ 30</small>
      </div>
    </div>


    {/* STATS */}
    <div className="dashboard-stats">

      <div className="dash-stat">
        <div className="stat-icon blue">◈</div>
        <div>
          <span>Days Completed</span>
          <strong>{completedDays.length}</strong>
          <small>of 30 days</small>
        </div>
      </div>

      <div className="dash-stat">
        <div className="stat-icon green">✓</div>
        <div>
          <span>Problems Solved</span>
          <strong>{solved}</strong>
          <small>{attempted} attempted</small>
        </div>
      </div>

      <div className="dash-stat">
        <div className="stat-icon purple">◷</div>
        <div>
          <span>Study Time</span>
          <strong>{formatTime(studySeconds)}</strong>
          <small>Total tracked</small>
        </div>
      </div>

      <div className="dash-stat">
        <div className="stat-icon orange">⚡</div>
        <div>
          <span>Overall Progress</span>
          <strong>{overall}%</strong>
          <small>Problem completion</small>
        </div>
      </div>

    </div>


    {/* MAIN GRID */}
    <div className="dashboard-main-grid">

      {/* PROGRESS */}
      <div className="dashboard-card progress-card">

        <div className="card-heading">
          <div>
            <span className="mini-label">PROGRESS</span>
            <h3>Preparation Progress</h3>
          </div>

          <strong className="progress-percent">
            {overall}%
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-value"
            style={{ width: `${overall}%` }}
          />
        </div>

        <div className="progress-details">
          <span>
            <b>{solved}</b> problems solved
          </span>

          <span>
            <b>{problems.length - solved}</b> remaining
          </span>
        </div>

      </div>


      {/* STUDY TIME */}
      <div className="dashboard-card study-card">

        <div className="card-heading">
          <div>
            <span className="mini-label">STUDY TIME</span>
            <h3>Focused Learning</h3>
          </div>

          <span className="live-dot">●</span>
        </div>

        <div className="study-time">
          {formatTime(studySeconds)}
        </div>

        <p>
          Keep the timer running while you study, solve problems,
          or revise concepts.
        </p>

        <button
          className="dashboard-action"
          onClick={() => setSection("Study Timer")}
        >
          Open Study Timer →
        </button>

      </div>

    </div>


    {/* BOTTOM GRID */}
    <div className="dashboard-bottom-grid">

      {/* DAILY FOCUS */}
      <div className="dashboard-card focus-card">

        <div className="card-heading">
          <div>
            <span className="mini-label">DAILY FOCUS</span>
            <h3>Today's Preparation</h3>
          </div>
        </div>

        <div className="focus-item">
          <span className="focus-number">01</span>
          <div>
            <strong>DSA Practice</strong>
            <p>Arrays, Hashing & Problem Solving</p>
          </div>
        </div>

        <div className="focus-item">
          <span className="focus-number">02</span>
          <div>
            <strong>Infosys Questions</strong>
            <p>Practice reported and Infosys-style problems</p>
          </div>
        </div>

        <div className="focus-item">
          <span className="focus-number">03</span>
          <div>
            <strong>Revision</strong>
            <p>Review mistakes and important patterns</p>
          </div>
        </div>

      </div>


      {/* QUICK ACTIONS */}
      <div className="dashboard-card actions-card">

        <div className="card-heading">
          <div>
            <span className="mini-label">QUICK ACTIONS</span>
            <h3>Continue Preparation</h3>
          </div>
        </div>

        <button
          className="quick-action"
          onClick={() => setSection("Today's Schedule")}
        >
          <span>📅</span>
          <div>
            <strong>Today's Schedule</strong>
            <small>Continue your 30-day roadmap</small>
          </div>
          <b>→</b>
        </button>

        <button
          className="quick-action"
          onClick={() => setSection("Infosys Questions")}
        >
          <span>⚡</span>
          <div>
            <strong>Infosys Questions</strong>
            <small>Practice focused questions</small>
          </div>
          <b>→</b>
        </button>

        <button
          className="quick-action"
          onClick={() => setSection("Problems")}
        >
          <span>💻</span>
          <div>
            <strong>Problems</strong>
            <small>Continue coding practice</small>
          </div>
          <b>→</b>
        </button>

      </div>

    </div>

  </div>
)}
        {/* ==================================================
            TODAY'S SCHEDULE
        ================================================== */}

        {section === "Today's Schedule" && (

          <div className="card">

            <div className="schedule-title">

              <div>

                <div className="eyebrow">
                  PREPARATION ROADMAP
                </div>

                <h2>
                  30-Day SP / DSE Roadmap
                </h2>

                <p>
                  Learn → Watch → Practice → Complete
                </p>

              </div>

              <div className="roadmap-progress">

                {completedDays.length}/30

                <small>
                  days completed
                </small>

              </div>

            </div>


            <div className="schedule-list">

              {schedule.map((day, i) => {

                const links =
                  resources[day[1]] ||
                  resources["Revision"];

                const completed =
                  completedDays.includes(i);

                return (

                  <div
                    className={`day-card ${
                      completed
                        ? "day-complete"
                        : ""
                    }`}
                    key={i}
                  >

                    <div className="day-number">

                      <span>
                        DAY
                      </span>

                      <strong>
                        {i + 1}
                      </strong>

                    </div>


                    <div className="day-content">

                      <div className="day-heading">

                        <div>

                          <h3>
                            {day[1]}
                          </h3>

                          <p>
                            {day[2]}
                          </p>

                        </div>

                        <span className="study-hours">
                          6–8 hrs
                        </span>

                      </div>


                      <div className="resource-buttons">

                        <a
                          href={links.learn}
                          target="_blank"
                          rel="noreferrer"
                          className="resource learn"
                        >
                          📚 Learn
                        </a>

                        <a
                          href={links.java}
                          target="_blank"
                          rel="noreferrer"
                          className="resource practice"
                        >
                          💻 Java
                        </a>

                        <a
                          href={links.youtube}
                          target="_blank"
                          rel="noreferrer"
                          className="resource youtube"
                        >
                          ▶ YouTube
                        </a>

                      </div>

                    </div>


                    <button
                      className={`complete-button ${
                        completed
                          ? "completed"
                          : ""
                      }`}
                      onClick={() =>
                        toggleDay(i)
                      }
                    >
                      {completed
                        ? "✓ Done"
                        : "Mark Done"}
                    </button>

                  </div>

                );

              })}

            </div>

          </div>

        )}


        {/* ==================================================
            TOPICS
        ================================================== */}

       {section === "Topics" && (
  <div className="card">
    <div className="section-head">
      <div>
        <h2>DSA Topics</h2>
        <p>What exactly to study for SP / DSE preparation</p>
      </div>
    </div>

    <div className="topic-grid">
      {topics.map((topic, index) => (
        <div className="topic-card" key={topic.name}>
          <span>TOPIC {String(index + 1).padStart(2, "0")}</span>

          <h3>
            {topic.icon} {topic.name}
          </h3>

          <p>
            {topic.subtopics.length} concepts to study
          </p>

          <div className="topic-subtopics">
            {topic.subtopics.map((item, i) => (
              <div className="subtopic" key={i}>
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
{section === "Infosys Questions" && (
  <div className="card">
    <div className="section-head">
      <div>
        <h2>⚡ Infosys Questions</h2>
        <p>Practice reported patterns + official samples + Infosys-style problems</p>
      </div>
    </div>

    <div className="infosys-question-list">

      <div className="infosys-question">
        <div>
          <span className="question-tag reported">REPORTED</span>
          <h3>Maximum Product Subarray</h3>
          <p>Arrays • Subarrays • Dynamic Programming</p>
        </div>
        <a
          href="https://leetcode.com/problems/maximum-product-subarray/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag reported">REPORTED</span>
          <h3>Longest Common Subsequence</h3>
          <p>Strings • Dynamic Programming</p>
        </div>
        <a
          href="https://leetcode.com/problems/longest-common-subsequence/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag reported">REPORTED</span>
          <h3>Product of Array Except Self</h3>
          <p>Arrays • Prefix/Suffix • Hashing</p>
        </div>
        <a
          href="https://leetcode.com/problems/product-of-array-except-self/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag reported">REPORTED</span>
          <h3>Longest Substring Without Repeating Characters</h3>
          <p>Strings • Sliding Window • HashMap</p>
        </div>
        <a
          href="https://leetcode.com/problems/longest-substring-without-repeating-characters/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag reported">REPORTED</span>
          <h3>Spiral Matrix</h3>
          <p>Arrays • Matrix • Boundary Traversal</p>
        </div>
        <a
          href="https://leetcode.com/problems/spiral-matrix/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag reported">REPORTED</span>
          <h3>Binary Search / Rotated Array</h3>
          <p>Binary Search • Arrays</p>
        </div>
        <a
          href="https://leetcode.com/problems/search-in-rotated-sorted-array/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag reported">REPORTED</span>
          <h3>Graph Connected Components</h3>
          <p>Graphs • BFS • DFS</p>
        </div>
        <a
          href="https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag style">INFOSYS-STYLE</span>
          <h3>Coin Change</h3>
          <p>Dynamic Programming • Optimization</p>
        </div>
        <a
          href="https://leetcode.com/problems/coin-change/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag style">INFOSYS-STYLE</span>
          <h3>Longest Increasing Subsequence</h3>
          <p>Dynamic Programming • Binary Search</p>
        </div>
        <a
          href="https://leetcode.com/problems/longest-increasing-subsequence/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

      <div className="infosys-question">
        <div>
          <span className="question-tag style">INFOSYS-STYLE</span>
          <h3>Number of Islands</h3>
          <p>Grid • BFS • DFS • Graphs</p>
        </div>
        <a
          href="https://leetcode.com/problems/number-of-islands/"
          target="_blank"
          rel="noreferrer"
        >
          Practice →
        </a>
      </div>

    </div>
  </div>
)}

        {/* ==================================================
            PROBLEMS
        ================================================== */}

        {section === "Problems" && (

          <div className="card">

            <div className="section-head">

              <div>

                <div className="eyebrow">
                  LEETCODE PRACTICE
                </div>

                <h2>
                  Blind 75 Practice
                </h2>

                <p>
                  Click a problem to open it on LeetCode.
                </p>

              </div>

              <strong>
                {solved}/{problems.length} Solved
              </strong>

            </div>


            <div className="problem-list">

              {problems.map((problem) => (

                <div
                  className="problem"
                  key={problem.id}
                >

                  <div className="problem-number">
                    {problem.id}
                  </div>


                  <div className="problem-main">

                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {problem.name} ↗
                    </a>

                    <span>
                      {problem.topic}
                    </span>

                  </div>


                  <span
                    className={`difficulty ${problem.difficulty.toLowerCase()}`}
                  >
                    {problem.difficulty}
                  </span>


                  <select
                    value={
                      problemStatus[problem.id] ||
                      "Not Started"
                    }
                    onChange={(e) =>
                      toggleProblem(
                        problem.id,
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Not Started
                    </option>

                    <option>
                      Attempted
                    </option>

                    <option>
                      Solved
                    </option>

                  </select>


                  <input
                    placeholder="Notes"
                    value={
                      notes[problem.id] || ""
                    }
                    onChange={(e) =>
                      setNotes((previous) => ({
                        ...previous,
                        [problem.id]:
                          e.target.value
                      }))
                    }
                  />

                </div>

              ))}

            </div>

          </div>

        )}


        {/* ==================================================
            STUDY TIMER
        ================================================== */}

        {section === "Study Timer" && (

          <div className="timer-card">

            <div className="eyebrow">
              FOCUS SESSION
            </div>

            <h2>
              Focused Study Timer
            </h2>

            <p>
              Track your actual preparation time.
            </p>


            <div className="timer">
              {formatTime(studySeconds)}
            </div>


            <div className="timer-buttons">

              <button
                onClick={() =>
                  setTimerRunning(true)
                }
              >
                ▶ Start
              </button>

              <button
                onClick={() =>
                  setTimerRunning(false)
                }
              >
                ⏸ Pause
              </button>

              <button
                onClick={() => {
                  setTimerRunning(false);
                  setStudySeconds(0);
                }}
              >
                ↻ Reset
              </button>

            </div>


            <div className="timer-target">
              Daily target:{" "}
              <strong>
                6–8 hours
              </strong>
            </div>

          </div>

        )}


        {/* ==================================================
            PROGRESS
        ================================================== */}

        {section === "Progress" && (

          <div className="progress-page">

            <div className="stats">

              <div className="stat-card">

                <span>
                  PROBLEMS SOLVED
                </span>

                <strong>
                  {solved}
                </strong>

                <small>
                  out of {problems.length}
                </small>

              </div>


              <div className="stat-card">

                <span>
                  ATTEMPTED
                </span>

                <strong>
                  {attempted}
                </strong>

                <small>
                  problems
                </small>

              </div>


              <div className="stat-card">

                <span>
                  PLAN COMPLETED
                </span>

                <strong>
                  {completedPercentage}%
                </strong>

                <small>
                  30-day roadmap
                </small>

              </div>


              <div className="stat-card">

                <span>
                  STUDY HOURS
                </span>

                <strong>
                  {(studySeconds / 3600).toFixed(1)}
                </strong>

                <small>
                  total tracked
                </small>

              </div>

            </div>


            <div className="card">

              <div className="section-head">

                <div>

                  <h2>
                    Overall Preparation
                  </h2>

                  <p>
                    Blind 75 completion progress
                  </p>

                </div>

                <strong>
                  {overall}%
                </strong>

              </div>


              <div className="progress-bar large">

                <div
                  className="progress-fill"
                  style={{
                    width: `${overall}%`
                  }}
                />

              </div>


              <h3>
                {solved} of {problems.length} problems solved
              </h3>

            </div>


            <div className="card">

              <div className="section-head">

                <div>

                  <h2>
                    30-Day Roadmap
                  </h2>

                  <p>
                    Daily completion
                  </p>

                </div>

                <strong>
                  {completedDays.length}/30
                </strong>

              </div>


              <div className="progress-bar large">

                <div
                  className="progress-fill"
                  style={{
                    width: `${completedPercentage}%`
                  }}
                />

              </div>

            </div>

          </div>

        )}


        {/* ==================================================
            MOCK TESTS
        ================================================== */}

       
          

      </main>

    </div>
    </>

  );
}

export default App;