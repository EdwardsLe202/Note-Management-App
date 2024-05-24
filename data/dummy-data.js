import Note from "../models/Note";
import Label from "../models/Label";
import Folder from "../models/Folder";

export const LABELS = [
    new Label('l1', 'React Native'),
    new Label('l2', 'Final Exam'),
    new Label('l3', 'Mini Project'),
    new Label('l4', 'Team Work'),
    new Label('l5', 'React Basic'),
];

export const COLORS = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];


export const NOTES = [
    new Note('n1', null, ['l1', 'l2'], 'Final Project Preparation', new Date('2024-5-10T12:30:00'), false),
    new Note('n2', COLORS[3], ['l3'], 'For our mini project!', new Date('2024-5-10T12:35:00'), true),
    new Note('n3', COLORS[4], ['l2'], 'Second note!', new Date('2024-4-20T15:30:00'), false),
    new Note('n4', COLORS[5], ['l1'], 'Ok the first note here!', new Date('2024-4-20T12:25:00'), false),
];

export const TRASH = [
    new Note('n5', COLORS[0], ['l4'], 'Learn React Native Navigation', new Date('2024-5-10T14:30:00'), true),
    new Note('n6', null, ['l4', 'l2', 'l1'], 'A simple note', new Date('2024-5-10T14:35:00'), false),
    new Note('n7', COLORS[6], ['l1', 'l2', 'l3', 'l4'], 'One more note', new Date('2024-4-20T15:30:00'), false),
];


export const FOLDERS = [
    new Folder('f1', 'Week01', ['n1', 'n3']),
    new Folder('f2', 'Week02', ['n2', 'n4']),
    new Folder('f3', 'Week03', []),
];

