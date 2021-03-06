//
//  PrayerRequestsViewController.m
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import "PrayerRequestsViewController.h"
#import "PrayerDetailViewController.h"

@interface PrayerRequestsViewController ()


@end

@implementation PrayerRequestsViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self loadCurrentLocalUrl:@"prayer"];
    
    self.title = @"Prayers & Praise";
}

#pragma mark - UIWebViewDelegate
- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    //[self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"alert(%@)", @"waef"]];
    //[self.webView stringByEvaluatingJavaScriptFromString:@"loadPreviousPrayers();"];
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSArray *pathComponents = request.URL.pathComponents;
    NSString *file = [pathComponents objectAtIndex:pathComponents.count-1];
    NSUInteger rangeLocation = [file rangeOfString:@"."].location;
    if (rangeLocation != NSNotFound) {
        NSString *fileName = [file substringWithRange:NSMakeRange(0, [file rangeOfString:@"."].location)];
        if ([fileName isEqualToString:@"prayer_single_view"]) {
            PrayerDetailViewController *vc = (PrayerDetailViewController *)[[UIStoryboard storyboardWithName:@"Storyboard" bundle:nil] instantiateViewControllerWithIdentifier:NSStringFromClass([PrayerDetailViewController class])];
            vc.prayerId = [[request.URL.query componentsSeparatedByString:@"="] objectAtIndex:1];
            [self.navigationController pushViewController:vc animated:YES];
            return NO;
        }
    }
    return YES;
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
