//
//  PrayerDetailViewController.m
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import "PrayerDetailViewController.h"

@interface PrayerDetailViewController ()

@end

@implementation PrayerDetailViewController

@synthesize prayerId = _prayerId;

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self loadCurrentLocalUrl:@"prayer_single_view"];
    
    self.title = @"Prayer";
}

#pragma mark - UIWebViewDelegate
- (void)webViewDidFinishLoad:(UIWebView *)webView
{
  NSLog(self.prayerId);
  [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"loadPrayer(%@)", self.prayerId]];
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
