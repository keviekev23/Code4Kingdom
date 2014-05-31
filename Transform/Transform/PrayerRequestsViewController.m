//
//  PrayerRequestsViewController.m
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import "PrayerRequestsViewController.h"

@interface PrayerRequestsViewController ()

- (void) loadCurrentLocalUrl:(NSString *)url;

@end

@implementation PrayerRequestsViewController

@synthesize contentWebView = _contentWebView;
@synthesize currentUrlName = _currentUrlName;

- (void) loadCurrentLocalUrl:(NSString *)url
{
    NSString *filename = [[NSBundle mainBundle] pathForResource:url ofType:@"html"];
    NSString* htmlString = [NSString stringWithContentsOfFile:filename encoding:NSUTF8StringEncoding error:nil];
    [self.contentWebView loadHTMLString:htmlString baseURL:nil];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.currentUrlName = @"prayer";
    [self loadCurrentLocalUrl:self.currentUrlName];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
